import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CadtpgService } from './cadtpg.service';
import { cadtpg } from '@prisma/client';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('cadtpg')
@Controller('cadtpg')
export class CadtpgController {
  constructor(private readonly cadtpgService: CadtpgService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar uma nova condição' })
  @ApiResponse({
    status: 201,
    description: 'A condição foi criada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
  async create(@Body() createCondicaoDto: CreateCondicaoDto): Promise<cadtpg> {
    return this.cadtpgService.createCondicao(createCondicaoDto.condicao);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter todas as condições' })
  @ApiResponse({ status: 200, description: 'Lista de condições' })
  async findAll(): Promise<cadtpg[]> {
    return this.cadtpgService.getCondicoes();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obter uma condição pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da condição a ser obtida',
  })
  @ApiResponse({ status: 200, description: 'A condição' })
  @ApiResponse({ status: 400, description: 'Formato de ID inválido' })
  @ApiResponse({ status: 404, description: 'Condição não encontrada' })
  async findOne(@Param('id') id: string): Promise<cadtpg> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.cadtpgService.getCondicaoById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar uma condição pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da condição a ser atualizada',
  })
  @ApiResponse({ status: 200, description: 'A condição atualizada' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos' })
  @ApiResponse({ status: 404, description: 'Condição não encontrada' })
  async update(
    @Param('id') id: string,
    @Body() updateCondicaoDto: UpdateCondicaoDto,
  ): Promise<cadtpg> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.cadtpgService.updateCondicao(id, updateCondicaoDto.condicao);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir uma condição pelo ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID da condição a ser excluída',
  })
  @ApiResponse({
    status: 204,
    description: 'A condição foi excluída com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Condição não encontrada' })
  async remove(@Param('id') id: string): Promise<void> {
    if (isNaN(Number(id))) {
      throw new BadRequestException('ID deve ser um número válido');
    }
    return this.cadtpgService.deleteCondicao(id);
  }
}
