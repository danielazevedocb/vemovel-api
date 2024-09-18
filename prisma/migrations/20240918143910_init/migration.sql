-- CreateTable
CREATE TABLE "cadtpg" (
    "ncond" SERIAL NOT NULL,
    "condicao" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cadtpg_pkey" PRIMARY KEY ("ncond")
);
