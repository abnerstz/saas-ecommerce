import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessWebhookDto } from './dto/process-webhook.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPaymentIntent(
    createPaymentDto: CreatePaymentDto,
    userId: string
  ) {
    const { orderId, paymentMethod } = createPaymentDto;

    // Verificar se o pedido existe e pertence ao usuário
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true },
    });

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (order.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    // Criar registro de pagamento
    const payment = await this.prisma.payment.create({
      data: {
        orderId,
        amount: order.total,
        currency: 'BRL',
        method: paymentMethod,
        status: 'PENDING',
        externalId: this.generateExternalId(),
      },
    });

    // Simular criação de intenção de pagamento (integração com gateway)
    const paymentIntent = await this.createExternalPaymentIntent(
      payment,
      order
    );

    // Atualizar com informações externas
    await this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        externalId: paymentIntent.id,
        metadata: JSON.stringify(paymentIntent.metadata),
      },
    });

    return {
      paymentId: payment.id,
      clientSecret: paymentIntent.client_secret,
      externalId: paymentIntent.id,
    };
  }

  async confirmPayment(paymentId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        order: {
          include: { user: true },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    if (payment.order.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    // Simular confirmação de pagamento
    const confirmed = await this.confirmExternalPayment(payment.externalId);

    if (confirmed) {
      // Atualizar status do pagamento
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });

      // Atualizar status do pedido
      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: 'COMPLETED',
          status: 'CONFIRMED',
        },
      });

      return { success: true, message: 'Pagamento confirmado com sucesso' };
    } else {
      // Atualizar status como falhou
      await this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: 'FAILED' },
      });

      return { success: false, message: 'Falha na confirmação do pagamento' };
    }
  }

  async processWebhook(webhookDto: ProcessWebhookDto) {
    const { type, data } = webhookDto;

    // Processar diferentes tipos de webhook
    switch (type) {
      case 'payment.succeeded':
        await this.handlePaymentSucceeded(data);
        break;
      case 'payment.failed':
        await this.handlePaymentFailed(data);
        break;
      case 'payment.cancelled':
        await this.handlePaymentCancelled(data);
        break;
      default:
        console.log(`Webhook não processado: ${type}`);
    }

    return { received: true };
  }

  async cancelPayment(paymentId: string, userId: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        order: {
          include: { user: true },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    if (payment.order.userId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    // Cancelar pagamento externo
    await this.cancelExternalPayment(payment.externalId);

    // Atualizar status
    await this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'CANCELLED' },
    });

    await this.prisma.order.update({
      where: { id: payment.orderId },
      data: { paymentStatus: 'CANCELLED' },
    });

    return { success: true, message: 'Pagamento cancelado com sucesso' };
  }

  private generateExternalId(): string {
    return `pay_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async createExternalPaymentIntent(payment: any, order: any) {
    // Simular integração com gateway de pagamento (Stripe, PagSeguro, etc.)
    return {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount: payment.amount * 100, // centavos
      currency: payment.currency.toLowerCase(),
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
    };
  }

  private async confirmExternalPayment(externalId: string): Promise<boolean> {
    // Simular confirmação com gateway externo
    // Em produção, fazer chamada real para o gateway
    return Math.random() > 0.1; // 90% de sucesso para simulação
  }

  private async cancelExternalPayment(externalId: string): Promise<void> {
    // Simular cancelamento com gateway externo
    console.log(`Cancelando pagamento externo: ${externalId}`);
  }

  private async handlePaymentSucceeded(data: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { externalId: data.payment_id },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'COMPLETED',
          processedAt: new Date(),
        },
      });

      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: {
          paymentStatus: 'COMPLETED',
          status: 'CONFIRMED',
        },
      });
    }
  }

  private async handlePaymentFailed(data: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { externalId: data.payment_id },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED' },
      });

      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: { paymentStatus: 'FAILED' },
      });
    }
  }

  private async handlePaymentCancelled(data: any): Promise<void> {
    const payment = await this.prisma.payment.findFirst({
      where: { externalId: data.payment_id },
    });

    if (payment) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'CANCELLED' },
      });

      await this.prisma.order.update({
        where: { id: payment.orderId },
        data: { paymentStatus: 'CANCELLED' },
      });
    }
  }
}
