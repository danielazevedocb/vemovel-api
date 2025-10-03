-- Remove unique constraint on descricao por empresa
ALTER TABLE "CADTIPOPAG" DROP CONSTRAINT IF EXISTS "cadtipopag_descricao_empresa_unique";
ALTER TABLE "CADTIPOPAG" DROP CONSTRAINT IF EXISTS "CADTIPOPAG_empresaId_descricao_key";
DROP INDEX IF EXISTS "cadtipopag_descricao_empresa_unique";
DROP INDEX IF EXISTS "CADTIPOPAG_empresaId_descricao_key";
