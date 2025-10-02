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
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EmpresaId } from 'src/common/decorators/empresa-id.decorator';
import { CadtipopagService } from './cadtipopag.service';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@ApiTags('Cadtipopag')
@ApiHeader({
  name: 'x-empresa-id',
  description:
    'Identificador numérico da empresa na qual a operação será executada.',
  required: true,
  schema: { type: 'integer', minimum: 1 },
})
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
  create(
    @EmpresaId() empresaId: number,
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
  findAll(@EmpresaId() empresaId: number) {
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
  findOne(
    @EmpresaId() empresaId: number,
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
  update(
    @EmpresaId() empresaId: number,
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
  remove(
    @EmpresaId() empresaId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cadtipopagService.remove(empresaId, id);
  }
}
