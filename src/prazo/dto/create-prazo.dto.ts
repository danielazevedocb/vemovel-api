import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePrazoDto {
  @ApiProperty({ description: 'Código numérico da condição', example: 101 })
  @Type(() => Number)
  @IsInt()
  ncond!: number;

  @ApiProperty({
    description: 'Descrição da condição de pagamento',
    example: 'À vista',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value === undefined || value === null ? value : String(value),
  )
  condicao!: string;

  @ApiPropertyOptional({ description: 'Percentual de acréscimo', example: 1.5 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  acrescimo?: number;

  @ApiPropertyOptional({ description: 'Percentual de desconto', example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  desconto?: number;

  @ApiPropertyOptional({ description: 'Prazo médio em dias', example: 30 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  prazoMedio?: number;

  @ApiPropertyOptional({
    description: 'Valor mínimo permitido para a condição',
    example: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valorMinimo?: number;

  @ApiPropertyOptional({
    description: 'Indica se usa caixa (S ou N)',
    example: 'S',
  })
  @IsOptional()
  @IsString()
  @IsIn(['S', 'N'])
  usaCaixa?: string;

  @ApiPropertyOptional({
    description: 'Modos de pagamento separados por ponto e vírgula',
    example: '01;03;07',
  })
  @IsOptional()
  @IsString()
  modosPagto?: string;

  @ApiPropertyOptional({
    description: 'Dias para o 1º vencimento',
    example: 30,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto1?: number;

  @ApiPropertyOptional({
    description: 'Dias para o 2º vencimento',
    example: 60,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto2?: number;

  @ApiPropertyOptional({
    description: 'Dias para o 3º vencimento',
    example: 90,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto3?: number;

  @ApiPropertyOptional({ description: 'Dias para o 4º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto4?: number;

  @ApiPropertyOptional({ description: 'Dias para o 5º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto5?: number;

  @ApiPropertyOptional({ description: 'Dias para o 6º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto6?: number;

  @ApiPropertyOptional({ description: 'Dias para o 7º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto7?: number;

  @ApiPropertyOptional({ description: 'Dias para o 8º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto8?: number;

  @ApiPropertyOptional({ description: 'Dias para o 9º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto9?: number;

  @ApiPropertyOptional({ description: 'Dias para o 10º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto10?: number;

  @ApiPropertyOptional({ description: 'Dias para o 11º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto11?: number;

  @ApiPropertyOptional({ description: 'Dias para o 12º vencimento' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto12?: number;

  @ApiPropertyOptional({
    description: 'Tipo da condição (1 ou 2)',
    example: '1',
  })
  @IsOptional()
  @IsString()
  @IsIn(['1', '2'])
  tipo?: string;
}
