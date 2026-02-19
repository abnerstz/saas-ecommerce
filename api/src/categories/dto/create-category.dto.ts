import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nome da categoria' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Descrição da categoria' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'URL da imagem da categoria' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Categoria está ativa?', default: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean = true;

  @ApiPropertyOptional({ description: 'Ordem de exibição' })
  @IsOptional()
  @IsNumber()
  order?: number;

  @ApiPropertyOptional({ description: 'ID da categoria pai' })
  @IsOptional()
  @IsString()
  parentId?: string;
}
