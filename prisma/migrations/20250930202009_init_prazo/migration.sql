-- CreateTable
CREATE TABLE "CADTPG" (
    "ncond" SERIAL NOT NULL,
    "condicao" TEXT NOT NULL,
    "acrescimo" DOUBLE PRECISION,
    "desconto" DOUBLE PRECISION,
    "prazoMedio" INTEGER,
    "valorMinimo" DOUBLE PRECISION,
    "usaCaixa" TEXT,
    "modosPagto" TEXT,
    "diasVencto1" INTEGER,
    "diasVencto2" INTEGER,
    "diasVencto3" INTEGER,
    "diasVencto4" INTEGER,
    "diasVencto5" INTEGER,
    "diasVencto6" INTEGER,
    "diasVencto7" INTEGER,
    "diasVencto8" INTEGER,
    "diasVencto9" INTEGER,
    "diasVencto10" INTEGER,
    "diasVencto11" INTEGER,
    "diasVencto12" INTEGER,
    "tipo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CADTPG_pkey" PRIMARY KEY ("ncond")
);
