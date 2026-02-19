import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderStatus } from '../common/types';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto, userId: string) {
    const { items, shippingAddress, billingAddress, notes } = createOrderDto;

    const customer = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!customer) {
      throw new NotFoundException('Usuário não encontrado');
    }

    let subtotal = 0;
    const orderItems: Array<{
      productId: string;
      productName: string;
      productSku: string | null;
      productImage: string | null;
      quantity: number;
      unitPrice: number;
      total: number;
    }> = [];

    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Produto ${item.productId} não encontrado`);
      }

      const price = Number(product.price);
      const itemTotal = price * item.quantity;
      subtotal += itemTotal;

      const images = product.images as Array<{ url?: string }> | null;
      const productImage = images?.[0]?.url ?? null;

      orderItems.push({
        productId: item.productId,
        productName: product.name,
        productSku: product.sku,
        productImage,
        quantity: item.quantity,
        unitPrice: price,
        total: itemTotal,
      });
    }

    const shippingCost = this.calculateShipping(subtotal, shippingAddress);
    const taxAmount = this.calculateTax(subtotal, shippingAddress);
    const total = subtotal + shippingCost + taxAmount;

    const orderNumber = await this.generateOrderNumber();

    const order = await this.prisma.order.create({
      data: {
        orderNumber,
        customerId: userId,
        customerEmail: customer.email,
        customerPhone: customer.phone ?? shippingAddress.phone ?? null,
        status: 'PENDING',
        subtotal,
        taxAmount,
        shippingCost,
        discountAmount: 0,
        total,
        notes: notes ?? null,
        shippingAddress: shippingAddress as object,
        billingAddress: billingAddress ? (billingAddress as object) : null,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return order;
  }

  async findAll(filters: OrderFilterDto) {
    const {
      page = 1,
      limit = 20,
      status,
      paymentStatus,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: 'insensitive' } },
        { customer: { email: { contains: search, mode: 'insensitive' } } },
        { customer: { firstName: { contains: search, mode: 'insensitive' } } },
        { customer: { lastName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      where.createdAt = { gte: new Date(startDate) };
    } else if (endDate) {
      where.createdAt = { lte: new Date(endDate) };
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          customer: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findByUser(userId: string, filters: OrderFilterDto) {
    const {
      page = 1,
      limit = 20,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = { customerId: userId };

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  images: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string, user: { id: string; role: string }) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (
      user.role !== 'SUPER_ADMIN' &&
      user.role !== 'TENANT_ADMIN' &&
      user.role !== 'MANAGER' &&
      order.customerId !== user.id
    ) {
      throw new ForbiddenException('Acesso negado');
    }

    return order;
  }

  async updateStatus(id: string, updateStatusDto: UpdateOrderStatusDto) {
    const { status, notes } = updateStatusDto;

    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    // Validar transições de status
    if (!this.isValidStatusTransition(order.status as OrderStatus, status)) {
      throw new ConflictException(
        `Não é possível alterar status de ${order.status} para ${status}`
      );
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status,
        notes: notes ?? order.notes,
        ...(status === OrderStatus.DELIVERED && { deliveredAt: new Date() }),
        ...(status === OrderStatus.SHIPPED && { shippedAt: new Date() }),
        ...(status === OrderStatus.CANCELLED && { cancelledAt: new Date() }),
      },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: true,
      },
    });

    return updatedOrder;
  }

  async cancel(id: string, user: any) {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (
      user.role !== 'SUPER_ADMIN' &&
      user.role !== 'TENANT_ADMIN' &&
      user.role !== 'MANAGER' &&
      order.customerId !== user.id
    ) {
      throw new ForbiddenException('Acesso negado');
    }

    // Verificar se o pedido pode ser cancelado
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      throw new ConflictException('Este pedido não pode ser cancelado');
    }

    const cancelledOrder = await this.prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
      },
      include: {
        customer: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: true,
      },
    });

    return cancelledOrder;
  }

  private async generateOrderNumber(): Promise<string> {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const prefix = `${year}${month}${day}`;

    // Buscar o último pedido do dia
    const lastOrder = await this.prisma.order.findFirst({
      where: {
        orderNumber: {
          startsWith: prefix,
        },
      },
      orderBy: {
        orderNumber: 'desc',
      },
    });

    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${String(sequence).padStart(4, '0')}`;
  }

  private calculateShipping(subtotal: number, address: any): number {
    // Implementar lógica de cálculo de frete
    // Por enquanto, frete grátis acima de R$ 100
    return subtotal >= 100 ? 0 : 15;
  }

  private calculateTax(subtotal: number, address: any): number {
    // Implementar lógica de cálculo de impostos
    // Por enquanto, sem impostos
    return 0;
  }

  private isValidStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus
  ): boolean {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.SHIPPED, OrderStatus.CANCELLED],
      [OrderStatus.SHIPPED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.CANCELLED]: [],
      [OrderStatus.REFUNDED]: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) || false;
  }
}
