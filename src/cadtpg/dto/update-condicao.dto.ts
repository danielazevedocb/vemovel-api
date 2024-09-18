import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCondicaoDto {
  @ApiProperty({
    description: 'Nome atualizado da condição',
    example: 'Condição de Pagamento Atualizada',
  })
  @IsNotEmpty()
  @IsString()
  condicao: string;
}
