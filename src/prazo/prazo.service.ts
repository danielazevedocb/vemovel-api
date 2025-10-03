import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Database } from 'src/db/database';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';

@Injectable()
export class PrazoService {
  constructor(private readonly db: Database) {}

  private async ensureEmpresaExists(empresaId: number): Promise<void> {
    const empresa = await this.db.empresa.findUnique({
      where: { id: empresaId },
    });
    if (!empresa) {
      throw new NotFoundException(
        `Empresa com código ${empresaId} não encontrada.`,
      );
    }
  }

  private handlePrismaError(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002' &&
      Array.isArray(error.meta?.target) &&
      error.meta.target.includes('empresaId') &&
      error.meta.target.includes('ncond')
    ) {
      throw new ConflictException(
        'Já existe um prazo cadastrado com esse código para a empresa informada.',
      );
    }
    throw error;
  }

  private async findOwnedPrazoOrThrow(empresaId: number, id: number) {
    const prazo = await this.db.prazo.findUnique({
      where: {
        empresaId_ncond: {
          empresaId,
          ncond: id,
        },
      },
    });
    if (!prazo) {
      throw new NotFoundException(`Prazo com código ${id} não encontrado.`);
    }
    return prazo;
  }

  async create(empresaId: number, createPrazoDto: CreatePrazoDto) {
    await this.ensureEmpresaExists(empresaId);
    let prazo;
    try {
      prazo = await this.db.prazo.create({
        data: {
          ...createPrazoDto,
          empresaId,
        },
      });
    } catch (error) {
      return this.handlePrismaError(error);
    }
    return {
      message: `Condição "${prazo.condicao}" criada com sucesso!!!`,
    };
  }

  async findAll(empresaId: number) {
    await this.ensureEmpresaExists(empresaId);
    return this.db.prazo.findMany({ where: { empresaId } });
  }

  async findOne(empresaId: number, id: number) {
    return this.findOwnedPrazoOrThrow(empresaId, id);
  }

  async update(empresaId: number, id: number, updatePrazoDto: UpdatePrazoDto) {
    await this.findOwnedPrazoOrThrow(empresaId, id);
    const prazo = await this.db.prazo.update({
      where: {
        empresaId_ncond: {
          empresaId,
          ncond: id,
        },
      },
      data: updatePrazoDto,
    });
    return {
      message: `Condição "${prazo.condicao}" atualizada com sucesso!!!`,
    };
  }

  async remove(empresaId: number, id: number) {
    const prazo = await this.findOwnedPrazoOrThrow(empresaId, id);
    await this.db.prazo.delete({
      where: {
        empresaId_ncond: {
          empresaId,
          ncond: id,
        },
      },
    });
    return {
      message: `Condição "${prazo.condicao}" removida com sucesso!!!`,
    };
  }
}
