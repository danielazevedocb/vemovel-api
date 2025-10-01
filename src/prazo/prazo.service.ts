import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/database';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';

@Injectable()
export class PrazoService {
  constructor(private readonly db: Database) {}

  private async ensureExists(id: number, error: unknown): Promise<never> {
    const prazo = await this.db.prazo.findUnique({ where: { ncond: id } });
    if (!prazo) {
      throw new NotFoundException(`Prazo com código ${id} não encontrado.`);
    }
    throw error;
  }

  async create(createPrazoDto: CreatePrazoDto) {
    const prazo = await this.db.prazo.create({ data: createPrazoDto });
    return {
      message: `Condição "${prazo.condicao}" criada com sucesso!!!`,
    };
  }

  findAll() {
    return this.db.prazo.findMany();
  }

  async findOne(id: number) {
    const prazo = await this.db.prazo.findUnique({ where: { ncond: id } });
    if (!prazo) {
      throw new NotFoundException(`Prazo com código ${id} não encontrado.`);
    }
    return prazo;
  }

  async update(id: number, updatePrazoDto: UpdatePrazoDto) {
    try {
      const prazo = await this.db.prazo.update({
        where: { ncond: id },
        data: updatePrazoDto,
      });
      return {
        message: `Condição "${prazo.condicao}" atualizada com sucesso!!!`,
      };
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }

  async remove(id: number) {
    try {
      const prazo = await this.db.prazo.delete({ where: { ncond: id } });
      return {
        message: `Condição "${prazo.condicao}" removida com sucesso!!!`,
      };
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }
}
