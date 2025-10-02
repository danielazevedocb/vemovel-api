import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(createEmpresaDto: CreateEmpresaDto) {
    return this.db.empresa.create({ data: createEmpresaDto });
  }

  findAll() {
    return this.db.empresa.findMany();
  }

  findOne(id: number) {
    return this.findOneOrThrow(id);
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    await this.findOneOrThrow(id);
    return this.db.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  async remove(id: number) {
    await this.findOneOrThrow(id);
    return this.db.empresa.delete({ where: { id } });
  }
}
