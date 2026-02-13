import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { PaymentMethod } from '@ecommerce/types';

class CreateOrderItemDto {
  @ApiProperty({ description: 'ID do produto' })
  @IsString()
  productId: string;

  @ApiPropertyOptional({ description: 'ID da variante do produto' })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiProperty({ description: 'Quantidade', minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;
}

class AddressDto {
  @ApiProperty({ description: 'Nome completo' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Endereço linha 1' })
  @IsString()
  address1: string;

  @ApiPropertyOptional({ description: 'Endereço linha 2' })
  @IsOptional()
  @IsString()
  address2?: string;

  @ApiProperty({ description: 'Cidade' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Estado' })
  @IsString()
  state: string;

  @ApiProperty({ description: 'CEP' })
  @IsString()
  zipCode: string;

  @ApiProperty({ description: 'País' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ description: 'Telefone' })
  @IsOptional()
  @IsString()
  phone?: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Itens do pedido', type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Endereço de entrega', type: AddressDto })
  @ValidateNested()
  @Type(() => AddressDto)
  shippingAddress: AddressDto;

  @ApiPropertyOptional({
    description: 'Endereço de cobrança (se diferente do endereço de entrega)',
    type: AddressDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  billingAddress?: AddressDto;

  @ApiProperty({
    description: 'Método de pagamento',
    enum: ['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO', 'PAYPAL'],
  })
  @IsEnum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO', 'PAYPAL'])
  paymentMethod: PaymentMethod;

  @ApiPropertyOptional({ description: 'Observações do pedido' })
  @IsOptional()
  @IsString()
  notes?: string;
}
