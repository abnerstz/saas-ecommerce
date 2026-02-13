import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '@ecommerce/types';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email do usuário' })
  @IsEmail({}, { message: 'Email deve ter um formato válido' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Senha deve ter pelo menos 8 caracteres' })
  @MaxLength(100, { message: 'Senha deve ter no máximo 100 caracteres' })
  password: string;

  @ApiProperty({
    example: 'João',
    description: 'Primeiro nome',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Primeiro nome deve ter no máximo 50 caracteres' })
  firstName?: string;

  @ApiProperty({
    example: 'Silva',
    description: 'Último nome',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50, { message: 'Último nome deve ter no máximo 50 caracteres' })
  lastName?: string;

  @ApiProperty({
    example: '+5511999999999',
    description: 'Telefone',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Telefone deve ter no máximo 20 caracteres' })
  phone?: string;

  @ApiProperty({
    example: 'CUSTOMER',
    description: 'Tipo de usuário',
    enum: UserRole,
    required: false,
    default: UserRole.CUSTOMER,
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message:
      'Tipo de usuário deve ser SUPER_ADMIN, TENANT_ADMIN, MANAGER, EMPLOYEE ou CUSTOMER',
  })
  role?: UserRole = UserRole.CUSTOMER;

  @ApiProperty({
    example: 'johndoe',
    description: 'Nome de usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Nome de usuário deve ter pelo menos 3 caracteres' })
  @MaxLength(30, {
    message: 'Nome de usuário deve ter no máximo 30 caracteres',
  })
  username?: string;
}
