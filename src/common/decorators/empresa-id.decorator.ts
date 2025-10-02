import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';

const HEADER_NAME = 'x-empresa-id';

function extractEmpresaId(rawValue: string | string[] | undefined): number {
  const value = Array.isArray(rawValue) ? rawValue[0] : rawValue;
  if (value === undefined || value === null) {
    throw new BadRequestException(
      `Cabeçalho ${HEADER_NAME} é obrigatório para operações multi-tenant.`,
    );
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new BadRequestException(
      `Cabeçalho ${HEADER_NAME} deve ser um inteiro positivo válido.`,
    );
  }

  return parsed;
}

export const EmpresaId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const raw =
      request.headers?.[HEADER_NAME] ??
      request.headers?.[HEADER_NAME.toLowerCase()];
    const empresaId = extractEmpresaId(raw);
    request.empresaId = empresaId;
    return empresaId;
  },
);

declare module 'express-serve-static-core' {
  interface Request {
    empresaId?: number;
  }
}
