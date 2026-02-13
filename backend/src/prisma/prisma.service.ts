import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
      errorFormat: 'colored',
    });

    // Log slow queries in development
    if (process.env.NODE_ENV === 'development') {
      this.$on('query', e => {
        if (e.duration > 1000) {
          // Log queries slower than 1s
          this.logger.warn(`Slow query detected: ${e.duration}ms - ${e.query}`);
        }
      });
    }

    this.$on('error', e => {
      this.logger.error('Prisma Error:', e);
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Successfully connected to database');
    } catch (error) {
      this.logger.error('Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database');
  }

  /**
   * Clean disconnection for graceful shutdown
   */
  async enableShutdownHooks(app: any) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  /**
   * Soft delete helper
   */
  softDelete(model: any, where: any) {
    return model.update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  /**
   * Transaction wrapper with retry logic
   */
  async executeTransaction<T>(
    fn: (
      prisma: Omit<
        PrismaClient,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
      >
    ) => Promise<T>,
    maxRetries = 3
  ): Promise<T> {
    let retries = 0;

    while (retries < maxRetries) {
      try {
        return await this.$transaction(fn);
      } catch (error) {
        retries++;

        if (retries === maxRetries) {
          this.logger.error(
            `Transaction failed after ${maxRetries} retries:`,
            error
          );
          throw error;
        }

        this.logger.warn(
          `Transaction retry ${retries}/${maxRetries}:`,
          error.message
        );

        // Exponential backoff
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, retries) * 1000)
        );
      }
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      this.logger.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats() {
    try {
      const [userCount, storeCount, productCount, orderCount] =
        await Promise.all([
          this.user.count(),
          this.store.count(),
          this.product.count(),
          this.order.count(),
        ]);

      return {
        users: userCount,
        stores: storeCount,
        products: productCount,
        orders: orderCount,
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('Failed to get database stats:', error);
      throw error;
    }
  }
}
