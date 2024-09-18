import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCondicaoDto {
  @ApiProperty({
    description: 'Nome da condição',
    example: 'Condição de Pagamento',
  })
  @IsNotEmpty()
  @IsString()
  condicao: string;
}
