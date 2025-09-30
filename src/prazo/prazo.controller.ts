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
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrazoService } from './prazo.service';

@Controller('prazo')
export class PrazoController {
  constructor(private readonly prazoService: PrazoService) {}

  @Post()
  create(@Body() createPrazoDto: CreatePrazoDto) {
    return this.prazoService.create(createPrazoDto);
  }

  @Get()
  findAll() {
    return this.prazoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prazoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrazoDto: UpdatePrazoDto,
  ) {
    return this.prazoService.update(id, updatePrazoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prazoService.remove(id);
  }
}
