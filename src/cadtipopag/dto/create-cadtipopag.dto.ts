import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCadtipopagDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) =>
    value === undefined || value === null ? value : String(value).trim(),
  )
  descricao!: string;
}
