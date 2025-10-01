import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CadtipopagService } from './cadtipopag.service';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@Controller('cadtipopag')
export class CadtipopagController {
  constructor(private readonly cadtipopagService: CadtipopagService) {}

  @Post()
  create(@Body() createCadtipopagDto: CreateCadtipopagDto) {
    return this.cadtipopagService.create(createCadtipopagDto);
  }

  @Get()
  findAll() {
    return this.cadtipopagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cadtipopagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCadtipopagDto: UpdateCadtipopagDto) {
    return this.cadtipopagService.update(+id, updateCadtipopagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cadtipopagService.remove(+id);
  }
}
