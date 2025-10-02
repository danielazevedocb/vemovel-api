-- Remove unique constraint on condicao per empresa
ALTER TABLE "CADTPG" DROP CONSTRAINT IF EXISTS "prazo_condicao_empresa_unique";
ALTER TABLE "CADTPG" DROP CONSTRAINT IF EXISTS "CADTPG_empresaId_condicao_key";
DROP INDEX IF EXISTS "prazo_condicao_empresa_unique";
DROP INDEX IF EXISTS "CADTPG_empresaId_condicao_key";
