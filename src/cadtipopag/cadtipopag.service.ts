import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/database';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@Injectable()
export class CadtipopagService {
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

  private async findOwnedTipoOrThrow(empresaId: number, id: number) {
    const tipo = await this.db.cadtipopag.findUnique({ where: { codigo: id } });
    if (!tipo || tipo.empresaId !== empresaId) {
      throw new NotFoundException(
        `Tipo de pagamento com código ${id} não encontrado.`,
      );
    }
    return tipo;
  }

  async create(empresaId: number, createCadtipopagDto: CreateCadtipopagDto) {
    await this.ensureEmpresaExists(empresaId);
    const tipo = await this.db.cadtipopag.create({
      data: {
        ...createCadtipopagDto,
        empresaId,
      },
    });
    return {
      message: `Tipo de pagamento "${tipo.descricao}" criado com sucesso!!!`,
    };
  }

  async findAll(empresaId: number) {
    await this.ensureEmpresaExists(empresaId);
    return this.db.cadtipopag.findMany({ where: { empresaId } });
  }

  async findOne(empresaId: number, id: number) {
    return this.findOwnedTipoOrThrow(empresaId, id);
  }

  async update(
    empresaId: number,
    id: number,
    updateCadtipopagDto: UpdateCadtipopagDto,
  ) {
    await this.findOwnedTipoOrThrow(empresaId, id);
    const tipo = await this.db.cadtipopag.update({
      where: { codigo: id },
      data: updateCadtipopagDto,
    });
    return {
      message: `Tipo de pagamento "${tipo.descricao}" atualizado com sucesso!!!`,
    };
  }

  async remove(empresaId: number, id: number) {
    const tipo = await this.findOwnedTipoOrThrow(empresaId, id);
    await this.db.cadtipopag.delete({ where: { codigo: id } });
    return {
      message: `Tipo de pagamento "${tipo.descricao}" removido com sucesso!!!`,
    };
  }
}
