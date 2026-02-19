import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessWebhookDto {
  @ApiProperty({ description: 'Tipo do evento do webhook' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Dados do evento' })
  @IsObject()
  data: any;
}
