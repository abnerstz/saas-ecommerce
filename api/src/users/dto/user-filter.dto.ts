import {
  IsOptional,
  IsString,
  IsNumber,
  IsEnum,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { UserRole } from '../../common/types';

export class UserFilterDto {
  @ApiPropertyOptional({
    description: 'Número da página',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Itens por página',
    minimum: 1,
    maximum: 100,
    default: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 20;

  @ApiPropertyOptional({ description: 'Termo de busca (email, nome)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Papel do usuário',
    enum: ['ADMIN', 'MANAGER', 'CUSTOMER'],
  })
  @IsOptional()
  @IsEnum(['ADMIN', 'MANAGER', 'CUSTOMER'])
  role?: UserRole;

  @ApiPropertyOptional({ description: 'Usuário está ativo?' })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Campo para ordenação',
    enum: ['email', 'firstName', 'lastName', 'createdAt', 'updatedAt'],
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['email', 'firstName', 'lastName', 'createdAt', 'updatedAt'])
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Ordem de classificação',
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}
