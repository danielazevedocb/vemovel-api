import { Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/db/database';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';

@Injectable()
export class PrazoService {
  constructor(private readonly db: Database) {}

  create(createPrazoDto: CreatePrazoDto) {
    return this.db.prazo.create({ data: createPrazoDto });
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
      return await this.db.prazo.update({
        where: { ncond: id },
        data: updatePrazoDto,
      });
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }

  async remove(id: number) {
    try {
      return await this.db.prazo.delete({ where: { ncond: id } });
    } catch (error) {
      return this.ensureExists(id, error);
    }
  }

  private async ensureExists(id: number, error: unknown): Promise<never> {
    const prazo = await this.db.prazo.findUnique({ where: { ncond: id } });
    if (!prazo) {
      throw new NotFoundException(`Prazo com código ${id} não encontrado.`);
    }
    throw error;
  }
}
