import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import type { UserRole } from '@ecommerce/types';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Email do usuário' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Primeiro nome' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ description: 'Último nome' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Papel do usuário (apenas para Admin)',
    enum: ['ADMIN', 'MANAGER', 'CUSTOMER'],
  })
  @IsOptional()
  @IsEnum(['ADMIN', 'MANAGER', 'CUSTOMER'])
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Usuário está ativo? (apenas para Admin)',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'Email está verificado? (apenas para Admin)',
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isEmailVerified?: boolean;
}
