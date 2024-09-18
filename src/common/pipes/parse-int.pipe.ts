import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any): number {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return intValue;
  }
}
