import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsObject,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { ProductStatus } from '@ecommerce/types';

class CreateProductImageDto {
  @ApiProperty({ description: 'URL da imagem' })
  @IsString()
  url: string;

  @ApiPropertyOptional({ description: 'Texto alternativo da imagem' })
  @IsOptional()
  @IsString()
  alt?: string;
}

class CreateProductVariantDto {
  @ApiProperty({ description: 'Nome da variação' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'SKU da variação' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Preço da variação' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Preço comparativo' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @ApiProperty({ description: 'Estoque da variação' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({ description: 'Atributos específicos da variação' })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;
}

class CreateProductSeoDto {
  @ApiPropertyOptional({ description: 'Título SEO' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: 'Descrição SEO' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Palavras-chave SEO' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];
}

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  @IsString()
  description: string;

  @ApiPropertyOptional({ description: 'Descrição curta do produto' })
  @IsOptional()
  @IsString()
  shortDescription?: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ description: 'Preço comparativo' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  compareAtPrice?: number;

  @ApiProperty({ description: 'SKU do produto' })
  @IsString()
  sku: string;

  @ApiProperty({ description: 'Quantidade em estoque' })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiPropertyOptional({
    description: 'Status do produto',
    enum: ['ACTIVE', 'INACTIVE', 'DRAFT'],
  })
  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'DRAFT'])
  status?: ProductStatus;

  @ApiPropertyOptional({ description: 'Produto é digital?' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isDigital?: boolean;

  @ApiPropertyOptional({ description: 'Produto requer envio?' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  requiresShipping?: boolean;

  @ApiPropertyOptional({ description: 'Produto é destaque?' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Peso do produto em gramas' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  weight?: number;

  @ApiPropertyOptional({ description: 'Comprimento em cm' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  length?: number;

  @ApiPropertyOptional({ description: 'Largura em cm' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  width?: number;

  @ApiPropertyOptional({ description: 'Altura em cm' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ description: 'IDs das categorias', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];

  @ApiPropertyOptional({
    description: 'Imagens do produto',
    type: [CreateProductImageDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images?: CreateProductImageDto[];

  @ApiPropertyOptional({
    description: 'Variações do produto',
    type: [CreateProductVariantDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductVariantDto)
  variants?: CreateProductVariantDto[];

  @ApiPropertyOptional({ description: 'Atributos personalizados do produto' })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'Configurações de SEO',
    type: CreateProductSeoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProductSeoDto)
  seo?: CreateProductSeoDto;
}
