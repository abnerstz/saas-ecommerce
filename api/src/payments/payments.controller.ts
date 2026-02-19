import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ProcessWebhookDto } from './dto/process-webhook.dto';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Criar intenção de pagamento' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create-intent')
  createPaymentIntent(
    @Body() createPaymentDto: CreatePaymentDto,
    @CurrentUser('id') userId: string
  ) {
    return this.paymentsService.createPaymentIntent(createPaymentDto, userId);
  }

  @ApiOperation({ summary: 'Confirmar pagamento' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':paymentId/confirm')
  confirmPayment(
    @Param('paymentId') paymentId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.paymentsService.confirmPayment(paymentId, userId);
  }

  @ApiOperation({ summary: 'Webhook para processar eventos de pagamento' })
  @Post('webhook')
  processWebhook(@Body() webhookDto: ProcessWebhookDto) {
    return this.paymentsService.processWebhook(webhookDto);
  }

  @ApiOperation({ summary: 'Cancelar pagamento' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':paymentId/cancel')
  cancelPayment(
    @Param('paymentId') paymentId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.paymentsService.cancelPayment(paymentId, userId);
  }
}
