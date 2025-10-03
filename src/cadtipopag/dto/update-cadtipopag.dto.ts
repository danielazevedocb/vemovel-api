import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCadtipopagDto } from './create-cadtipopag.dto';

export class UpdateCadtipopagDto extends PartialType(
  OmitType(CreateCadtipopagDto, ['codigo'] as const),
) {}
