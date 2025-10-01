import { PartialType } from '@nestjs/mapped-types';
import { CreateCadtipopagDto } from './create-cadtipopag.dto';

export class UpdateCadtipopagDto extends PartialType(CreateCadtipopagDto) {}
