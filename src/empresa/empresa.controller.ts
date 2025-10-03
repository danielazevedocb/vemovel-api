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
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { EmpresaService } from './empresa.service';

@ApiTags('Empresa')
@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiCreatedResponse({
    description: 'Empresa criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Vemovel Matriz' },
        cnpj: { type: 'string', nullable: true, example: '12345678000199' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
  })
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.create(createEmpresaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar empresas cadastradas' })
  @ApiOkResponse({
    description: 'Lista de empresas',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Vemovel Matriz' },
          cnpj: { type: 'string', nullable: true, example: '12345678000199' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
        additionalProperties: false,
      },
    },
  })
  findAll() {
    return this.empresaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por código' })
  @ApiOkResponse({
    description: 'Empresa encontrada',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Vemovel Matriz' },
        cnpj: { type: 'string', nullable: true, example: '12345678000199' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Empresa com código 99 não encontrada.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar dados de uma empresa' })
  @ApiOkResponse({
    description: 'Empresa atualizada',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Vemovel Matriz' },
        cnpj: { type: 'string', nullable: true, example: '12345678000199' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Empresa com código 99 não encontrada.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
  ) {
    return this.empresaService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma empresa' })
  @ApiOkResponse({
    description: 'Empresa removida',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        nome: { type: 'string', example: 'Vemovel Matriz' },
        cnpj: { type: 'string', nullable: true, example: '12345678000199' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
      additionalProperties: false,
    },
  })
  @ApiNotFoundResponse({
    description: 'Empresa não encontrada',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: {
          type: 'string',
          example: 'Empresa com código 99 não encontrada.',
        },
        error: { type: 'string', example: 'Not Found' },
      },
    },
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.empresaService.remove(id);
  }
}
