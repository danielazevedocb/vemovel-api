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
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tipo de pagamento "Cartão" criado com sucesso!!!',
        },
      },
    },
  })
  create(@Body() createCadtipopagDto: CreateCadtipopagDto) {
    return this.cadtipopagService.create(createCadtipopagDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar tipos de pagamento' })
  @ApiOkResponse({
    description: 'Lista de tipos de pagamento cadastrados',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          codigo: { type: 'integer', example: 1 },
          descricao: { type: 'string', example: 'Cartão de crédito' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        additionalProperties: true,
      },
    },
  })
  findAll() {
    return this.cadtipopagService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um tipo de pagamento' })
  @ApiOkResponse({
    description: 'Tipo de pagamento encontrado',
    schema: {
      type: 'object',
      properties: {
        codigo: { type: 'integer', example: 1 },
        descricao: { type: 'string', example: 'Cartão de crédito' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: true,
    },
  })
  @ApiNotFoundResponse({
    description: 'Tipo de pagamento não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Tipo de pagamento com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de pagamento' })
  @ApiOkResponse({
    description: 'Tipo de pagamento atualizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tipo de pagamento "Cartão" atualizado com sucesso!!!',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Tipo de pagamento não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Tipo de pagamento com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
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
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Tipo de pagamento "Cartão" removido com sucesso!!!',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Tipo de pagamento não encontrado',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Tipo de pagamento com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cadtipopagService.remove(id);
  }
}
