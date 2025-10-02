import { Injectable, NotFoundException } from '@nestjs/common';
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

  private async findOwnedPrazoOrThrow(empresaId: number, id: number) {
    const prazo = await this.db.prazo.findUnique({ where: { ncond: id } });
    if (!prazo || prazo.empresaId !== empresaId) {
      throw new NotFoundException(`Prazo com código ${id} não encontrado.`);
    }
    return prazo;
  }

  async create(empresaId: number, createPrazoDto: CreatePrazoDto) {
    await this.ensureEmpresaExists(empresaId);
    const prazo = await this.db.prazo.create({
      data: {
        ...createPrazoDto,
        empresaId,
      },
    });
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
      where: { ncond: id },
      data: updatePrazoDto,
    });
    return {
      message: `Condição "${prazo.condicao}" atualizada com sucesso!!!`,
    };
  }

  async remove(empresaId: number, id: number) {
    const prazo = await this.findOwnedPrazoOrThrow(empresaId, id);
    await this.db.prazo.delete({ where: { ncond: id } });
    return {
      message: `Condição "${prazo.condicao}" removida com sucesso!!!`,
    };
  }
}
