-- Create table for tenant (empresa)
CREATE TABLE "EMPRESA" (
    "id" SERIAL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX "EMPRESA_cnpj_key" ON "EMPRESA"("cnpj");

-- Seed default empresa to preserve existing data references
-- Add tenant column to Prazo (CADTPG)
ALTER TABLE "CADTPG" ADD COLUMN "empresaId" INTEGER NOT NULL DEFAULT 1;

-- Add tenant column to Cadtipopag (CADTIPOPAG)
ALTER TABLE "CADTIPOPAG" ADD COLUMN "empresaId" INTEGER NOT NULL DEFAULT 1;

-- Remove defaults so new rows must specify empresaId explicitly
ALTER TABLE "CADTPG" ALTER COLUMN "empresaId" DROP DEFAULT;
ALTER TABLE "CADTIPOPAG" ALTER COLUMN "empresaId" DROP DEFAULT;

-- Create indexes and unique constraints scoped by empresa
CREATE INDEX "prazo_empresa_idx" ON "CADTPG"("empresaId");
CREATE UNIQUE INDEX "prazo_condicao_empresa_unique" ON "CADTPG"("empresaId", "condicao");

CREATE INDEX "cadtipopag_empresa_idx" ON "CADTIPOPAG"("empresaId");
CREATE UNIQUE INDEX "cadtipopag_descricao_empresa_unique" ON "CADTIPOPAG"("empresaId", "descricao");

-- Add foreign key constraints
ALTER TABLE "CADTPG"
  ADD CONSTRAINT "CADTPG_empresaId_fkey"
  FOREIGN KEY ("empresaId")
  REFERENCES "EMPRESA"("id")
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

ALTER TABLE "CADTIPOPAG"
  ADD CONSTRAINT "CADTIPOPAG_empresaId_fkey"
  FOREIGN KEY ("empresaId")
  REFERENCES "EMPRESA"("id")
  ON UPDATE CASCADE
  ON DELETE RESTRICT;
