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
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
import { PrazoService } from './prazo.service';

@ApiTags('Prazo')
@ApiParam({
  name: 'empresaId',
  description: 'Identificador da empresa',
  type: Number,
})
@Controller('empresas/:empresaId/prazo')
export class PrazoController {
  constructor(private readonly prazoService: PrazoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova condição de pagamento' })
  @ApiCreatedResponse({
    description: 'Condição criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Condição "À vista" criada com sucesso!!!',
        },
      },
    },
  })
  create(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Body() createPrazoDto: CreatePrazoDto,
  ) {
    return this.prazoService.create(empresaId, createPrazoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar condições de pagamento' })
  @ApiOkResponse({
    description: 'Lista de condições cadastradas',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          ncond: { type: 'integer', example: 1 },
          condicao: { type: 'string', example: 'À vista' },
          acrescimo: { type: 'number', nullable: true, example: null },
          desconto: { type: 'number', nullable: true, example: null },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        additionalProperties: true,
      },
    },
  })
  findAll(@Param('empresaId', ParseIntPipe) empresaId: number) {
    return this.prazoService.findAll(empresaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar condição de pagamento por código' })
  @ApiOkResponse({
    description: 'Condição encontrada',
    schema: {
      type: 'object',
      properties: {
        ncond: { type: 'integer', example: 1 },
        condicao: { type: 'string', example: 'À vista' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: true,
    },
  })
  @ApiNotFoundResponse({
    description: 'Condição não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Prazo com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Código interno da condição de pagamento',
    type: Number,
  })
  findOne(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.prazoService.findOne(empresaId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma condição de pagamento' })
  @ApiOkResponse({
    description: 'Condição atualizada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Condição "À vista" atualizada com sucesso!!!',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Condição não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Prazo com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Código interno da condição de pagamento',
    type: Number,
  })
  update(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrazoDto: UpdatePrazoDto,
  ) {
    return this.prazoService.update(empresaId, id, updatePrazoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma condição de pagamento' })
  @ApiOkResponse({
    description: 'Condição removida com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Condição "À vista" removida com sucesso!!!',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Condição não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Prazo com código 99 não encontrado.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Código interno da condição de pagamento',
    type: Number,
  })
  remove(
    @Param('empresaId', ParseIntPipe) empresaId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.prazoService.remove(empresaId, id);
  }
}
