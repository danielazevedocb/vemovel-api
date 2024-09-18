import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { cadtpg } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CadtpgService {
  constructor(private readonly prisma: PrismaService) {}

  async createCondicao(condicao: string): Promise<cadtpg> {
    try {
      return this.prisma.cadtpg.create({
        data: { condicao },
      });
    } catch (error) {
      console.error('Erro ao criar condição:', error);
      throw new InternalServerErrorException('Erro ao criar condição');
    }
  }

  async getCondicoes(): Promise<cadtpg[]> {
    try {
      return this.prisma.cadtpg.findMany();
    } catch (error) {
      console.error('Erro ao buscar condições:', error);
      throw new InternalServerErrorException('Erro ao buscar condições');
    }
  }

  async getCondicaoById(id: string): Promise<cadtpg> {
    try {
      // Converter id para número
      const numericId = parseInt(id, 10);

      // Validar se id é um número válido
      if (isNaN(numericId)) {
        throw new InternalServerErrorException('ID inválido');
      }

      const condicao = await this.prisma.cadtpg.findUnique({
        where: { ncond: numericId },
      });

      if (!condicao) {
        throw new NotFoundException(
          `Condição com o ID ${numericId} não encontrada`,
        );
      }

      return condicao;
    } catch (error) {
      console.error('Erro ao buscar condição por ID:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar condição por ID');
    }
  }

  async updateCondicao(id: string, condicao: string): Promise<cadtpg> {
    try {
      // Converter id para número
      const numericId = parseInt(id, 10);

      // Validar se id é um número válido
      if (isNaN(numericId)) {
        throw new InternalServerErrorException('ID inválido');
      }

      const existingCondicao = await this.prisma.cadtpg.findUnique({
        where: { ncond: numericId },
      });

      if (!existingCondicao) {
        throw new NotFoundException(
          `Condição com o ID ${numericId} não encontrada`,
        );
      }

      return this.prisma.cadtpg.update({
        where: { ncond: numericId },
        data: { condicao },
      });
    } catch (error) {
      console.error('Erro ao atualizar condição:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar condição');
    }
  }

  async deleteCondicao(id: string): Promise<void> {
    try {
      // Converter id para número
      const numericId = parseInt(id, 10);

      // Validar se id é um número válido
      if (isNaN(numericId)) {
        throw new InternalServerErrorException('ID inválido');
      }

      const existingCondicao = await this.prisma.cadtpg.findUnique({
        where: { ncond: numericId },
      });

      if (!existingCondicao) {
        throw new NotFoundException(
          `Condição com o ID ${numericId} não encontrada`,
        );
      }

      await this.prisma.cadtpg.delete({
        where: { ncond: numericId },
      });
    } catch (error) {
      console.error('Erro ao deletar condição:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao deletar condição');
    }
  }
}
