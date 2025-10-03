-- Ensure UUID generation is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- --- Prazo (CADTPG) ---
ALTER TABLE "CADTPG" DROP CONSTRAINT IF EXISTS "CADTPG_pkey";
ALTER TABLE "CADTPG" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid();
UPDATE "CADTPG" SET "id" = gen_random_uuid() WHERE "id" IS NULL;


ALTER TABLE "CADTPG" ADD CONSTRAINT "CADTPG_pkey" PRIMARY KEY ("id");
DROP INDEX IF EXISTS "prazo_condicao_empresa_unique";
DROP INDEX IF EXISTS "CADTPG_empresaId_condicao_key";
DROP INDEX IF EXISTS "prazo_empresa_ncond_unique";
CREATE UNIQUE INDEX "prazo_empresa_ncond_unique" ON "CADTPG" ("empresaId", "ncond");

-- --- Cadtipopag (CADTIPOPAG) ---
ALTER TABLE "CADTIPOPAG" DROP CONSTRAINT IF EXISTS "CADTIPOPAG_pkey";
ALTER TABLE "CADTIPOPAG" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid();
UPDATE "CADTIPOPAG" SET "id" = gen_random_uuid() WHERE "id" IS NULL;
ALTER TABLE "CADTIPOPAG" ALTER COLUMN "id" SET NOT NULL;
ALTER TABLE "CADTIPOPAG" ALTER COLUMN "codigo" DROP DEFAULT;
ALTER TABLE "CADTIPOPAG" ADD CONSTRAINT "CADTIPOPAG_pkey" PRIMARY KEY ("id");
DROP INDEX IF EXISTS "cadtipopag_empresa_idx";
DROP INDEX IF EXISTS "cadtipopag_descricao_empresa_unique";
DROP INDEX IF EXISTS "CADTIPOPAG_empresaId_descricao_key";
DROP INDEX IF EXISTS "cadtipopag_empresa_codigo_unique";
CREATE INDEX IF NOT EXISTS "cadtipopag_empresa_idx" ON "CADTIPOPAG" ("empresaId");
CREATE UNIQUE INDEX "cadtipopag_empresa_codigo_unique" ON "CADTIPOPAG" ("empresaId", "codigo");
