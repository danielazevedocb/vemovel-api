import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCadtipopagDto {
  @ApiProperty({
    description: 'Descrição do tipo de pagamento',
    example: 'Cartão de crédito',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value === undefined || value === null ? value : String(value).trim(),
  )
  descricao!: string;
}
