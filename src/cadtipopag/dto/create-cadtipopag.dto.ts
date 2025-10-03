import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCadtipopagDto {
  @ApiProperty({
    description: 'Código interno do tipo de pagamento',
    example: 12,
  })
  @Type(() => Number)
  @IsInt()
  codigo!: number;

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
