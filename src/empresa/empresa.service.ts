import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Database } from 'src/db/database';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly db: Database) {}

  private async findOneOrThrow(id: number) {
    const empresa = await this.db.empresa.findUnique({ where: { id } });
    if (!empresa) {
      throw new NotFoundException(`Empresa com código ${id} não encontrada.`);
    }
    return empresa;
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      const target = Array.isArray(error.meta?.target)
        ? error.meta?.target.join(', ')
        : error.meta?.target;
      if (target && String(target).includes('cnpj')) {
        throw new ConflictException('Já existe uma empresa cadastrada com este CNPJ.');
      }
    }
    throw error;
  }

  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      return await this.db.empresa.create({ data: createEmpresaDto });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  findAll() {
    return this.db.empresa.findMany();
  }

  findOne(id: number) {
    return this.findOneOrThrow(id);
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOneOrThrow(id);
    try {
      return await this.db.empresa.update({
        where: { id },
        data: updateEmpresaDto,
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
  }

  async remove(id: number) {
    await this.findOneOrThrow(id);
    return this.db.empresa.delete({ where: { id } });
  }
}
