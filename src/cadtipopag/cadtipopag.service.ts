import { Injectable } from '@nestjs/common';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@Injectable()
export class CadtipopagService {
  create(createCadtipopagDto: CreateCadtipopagDto) {
    return 'This action adds a new cadtipopag';
  }

  findAll() {
    return `This action returns all cadtipopag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cadtipopag`;
  }

  update(id: number, updateCadtipopagDto: UpdateCadtipopagDto) {
    return `This action updates a #${id} cadtipopag`;
  }

  remove(id: number) {
    return `This action removes a #${id} cadtipopag`;
  }
}
