import {
  IsString,
  IsOptional,
  IsBoolean,
  IsObject,
  IsUrl,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({ description: 'Nome da loja' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Descrição da loja' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'URL do logo da loja' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ description: 'URL do favicon da loja' })
  @IsOptional()
  @IsUrl()
  faviconUrl?: string;

  @ApiPropertyOptional({ description: 'Domínio customizado da loja' })
  @IsOptional()
  @IsString()
  customDomain?: string;

  @ApiPropertyOptional({ description: 'Tipo/nicho da loja' })
  @IsOptional()
  @IsString()
  niche?: string;

  @ApiPropertyOptional({ description: 'Loja está ativa?', default: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean = true;

  @ApiPropertyOptional({ description: 'Configurações personalizadas da loja' })
  @IsOptional()
  @IsObject()
  settings?: Record<string, any>;
}
