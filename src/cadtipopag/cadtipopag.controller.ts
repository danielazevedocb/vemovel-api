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
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CadtipopagService } from './cadtipopag.service';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@ApiTags('Cadtipopag')
@ApiParam({
  name: 'empresaId',
  description: 'Identificador da empresa',
  type: Number,
})
@Controller('empresas/:empresaId/cadtipopag')
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
  create(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Body() createCadtipopagDto: CreateCadtipopagDto,
  ) {
    return this.cadtipopagService.create(empresaId, createCadtipopagDto);
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
  findAll(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.cadtipopagService.findAll(empresaId);
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
  @ApiParam({
    name: 'id',
    description: 'Código interno do tipo de pagamento',
    type: Number,
  })
  findOne(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cadtipopagService.findOne(empresaId, id);
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
  @ApiParam({
    name: 'id',
    description: 'Código interno do tipo de pagamento',
    type: Number,
  })
  update(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCadtipopagDto: UpdateCadtipopagDto,
  ) {
    return this.cadtipopagService.update(empresaId, id, updateCadtipopagDto);
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
  @ApiParam({
    name: 'id',
    description: 'Código interno do tipo de pagamento',
    type: Number,
  })
  remove(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cadtipopagService.remove(empresaId, id);
  }
}
