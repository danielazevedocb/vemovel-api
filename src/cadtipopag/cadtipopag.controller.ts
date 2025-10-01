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
import { CadtipopagService } from './cadtipopag.service';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@ApiTags('Cadtipopag')
@Controller('cadtipopag')
export class CadtipopagController {
  constructor(private readonly cadtipopagService: CadtipopagService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de pagamento' })
  @ApiCreatedResponse({
    description: 'Tipo de pagamento criado com sucesso',
    schema: {
      example: {
        message: 'Tipo de pagamento "Cartão" criado com sucesso (código 1).',
        id: 1,
      },
    },
  })
  create(@Body() createCadtipopagDto: CreateCadtipopagDto) {
    return this.cadtipopagService.create(createCadtipopagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de pagamento' })
  @ApiOkResponse({ description: 'Lista de tipos de pagamento cadastrados' })
  findAll() {
    return this.cadtipopagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um tipo de pagamento' })
  @ApiOkResponse({ description: 'Tipo de pagamento encontrado' })
  @ApiNotFoundResponse({ description: 'Tipo de pagamento não encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de pagamento' })
  @ApiOkResponse({
    description: 'Tipo de pagamento atualizado com sucesso',
    schema: {
      example: {
        message: 'Tipo de pagamento "Cartão" atualizado com sucesso (código 1).',
        id: 1,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Tipo de pagamento não encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCadtipopagDto: UpdateCadtipopagDto,
  ) {
    return this.cadtipopagService.update(id, updateCadtipopagDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tipo de pagamento' })
  @ApiOkResponse({
    description: 'Tipo de pagamento removido com sucesso',
    schema: {
      example: {
        message: 'Tipo de pagamento "Cartão" removido com sucesso (código 1).',
        id: 1,
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Tipo de pagamento não encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.remove(id);
  }
}
