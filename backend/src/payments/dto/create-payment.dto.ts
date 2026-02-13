import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { PaymentMethod } from '@ecommerce/types';

export class CreatePaymentDto {
  @ApiProperty({ description: 'ID do pedido' })
  @IsString()
  orderId: string;

  @ApiProperty({
    description: 'Método de pagamento',
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO', 'PAYPAL'],
  })
  @IsEnum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO', 'PAYPAL'])
  paymentMethod: PaymentMethod;
}
