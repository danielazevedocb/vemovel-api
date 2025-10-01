import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/database';
import { CreateCadtipopagDto } from './dto/create-cadtipopag.dto';
import { UpdateCadtipopagDto } from './dto/update-cadtipopag.dto';

@Injectable()
export class CadtipopagService {
  constructor(private readonly db: Database) {}

  private async ensureExists(id: number, error: unknown): Promise<never> {
    const tipo = await this.db.cadtipopag.findUnique({ where: { codigo: id } });
    if (!tipo) {
      throw new NotFoundException(
        `Tipo de pagamento com código ${id} não encontrado.`,
      );
    }
    throw error;
  }

  async create(createCadtipopagDto: CreateCadtipopagDto) {
    const tipo = await this.db.cadtipopag.create({ data: createCadtipopagDto });
    return {
      message: `Tipo de pagamento "${tipo.descricao}" criado com sucesso (código ${tipo.codigo}).`,
      id: tipo.codigo,
    };
  }

  findAll() {
    return this.db.cadtipopag.findMany();
  }

  async findOne(id: number) {
    const tipo = await this.db.cadtipopag.findUnique({ where: { codigo: id } });
    if (!tipo) {
      throw new NotFoundException(
        `Tipo de pagamento com código ${id} não encontrado.`,
      );
    }
    return tipo;
  }

  async update(id: number, updateCadtipopagDto: UpdateCadtipopagDto) {
    try {
      const tipo = await this.db.cadtipopag.update({
        where: { codigo: id },
        data: updateCadtipopagDto,
      });
      return {
        message: `Tipo de pagamento "${tipo.descricao}" atualizado com sucesso (código ${tipo.codigo}).`,
        id: tipo.codigo,
      };
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }

  async remove(id: number) {
    try {
      const tipo = await this.db.cadtipopag.delete({ where: { codigo: id } });
      return {
        message: `Tipo de pagamento "${tipo.descricao}" removido com sucesso (código ${tipo.codigo}).`,
        id: tipo.codigo,
      };
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }
}
