import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCadtipopagDto: UpdateCadtipopagDto,
  ) {
    return this.cadtipopagService.update(id, updateCadtipopagDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.remove(id);
  }
}
