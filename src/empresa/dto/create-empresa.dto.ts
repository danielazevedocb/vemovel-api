import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

const CNPJ_REGEX = /^\d{14}$/;

export class CreateEmpresaDto {
  @ApiProperty({
    description: 'Nome fantasia ou razão social da empresa',
    example: 'Vemóvel Matriz',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }): string | undefined =>
    value === undefined || value === null ? value : String(value).trim(),
  )
  nome!: string;

  @ApiPropertyOptional({
    description: 'CNPJ apenas com números (14 dígitos)',
    example: '12345678000199',
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @MaxLength(14)
  @Transform(({ value }): string | undefined => {
    if (value === undefined || value === null) {
      return value;
    }
    const sanitized = String(value).replace(/\D/g, '');
    return sanitized.length === 0 ? undefined : sanitized;
  })
  @Matches(CNPJ_REGEX, {
    message: 'CNPJ deve conter exatamente 14 números.',
  })
  cnpj?: string;
}
