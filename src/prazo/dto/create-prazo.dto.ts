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
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value === undefined || value === null ? value : String(value),
  )
  condicao!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  acrescimo?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  desconto?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  prazoMedio?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  valorMinimo?: number;

  @IsOptional()
  @IsString()
  @IsIn(['S', 'N'])
  usaCaixa?: string;

  @IsOptional()
  @IsString()
  modosPagto?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto1?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto2?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto3?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto4?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto5?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto6?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto7?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto8?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto9?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto10?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto11?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  diasVencto12?: number;

  @IsOptional()
  @IsString()
  @IsIn(['1', '2'])
  tipo?: string;
}
