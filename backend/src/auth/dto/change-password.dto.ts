import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'currentpassword', description: 'Senha atual' })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Nova senha',
    minLength: 8,
  })
  @IsString()
  @MinLength(8, { message: 'Nova senha deve ter pelo menos 8 caracteres' })
  @MaxLength(100, { message: 'Nova senha deve ter no máximo 100 caracteres' })
  newPassword: string;
}
