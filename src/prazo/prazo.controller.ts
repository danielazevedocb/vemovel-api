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
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrazoService } from './prazo.service';

@ApiTags('Prazo')
@Controller('prazo')
export class PrazoController {
  constructor(private readonly prazoService: PrazoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova condição de pagamento' })
  @ApiCreatedResponse({
    description: 'Condição criada com sucesso',
    schema: {
      example: {
        message: 'Condição "À vista" criada com sucesso (código 1).',
        id: 1,
      },
    },
  })
  create(@Body() createPrazoDto: CreatePrazoDto) {
    return this.prazoService.create(createPrazoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar condições de pagamento' })
  @ApiOkResponse({ description: 'Lista de condições cadastradas' })
  findAll() {
    return this.prazoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar condição de pagamento por código' })
  @ApiOkResponse({ description: 'Condição encontrada' })
  @ApiNotFoundResponse({ description: 'Condição não encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.prazoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma condição de pagamento' })
  @ApiOkResponse({
    description: 'Condição atualizada com sucesso',
    schema: {
      example: {
        message: 'Condição "À vista" atualizada com sucesso (código 1).',
        id: 1,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Condição não encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrazoDto: UpdatePrazoDto,
  ) {
    return this.prazoService.update(id, updatePrazoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma condição de pagamento' })
  @ApiOkResponse({
    description: 'Condição removida com sucesso',
    schema: {
      example: {
        message: 'Condição "À vista" removida com sucesso (código 1).',
        id: 1,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Condição não encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.prazoService.remove(id);
  }
}
