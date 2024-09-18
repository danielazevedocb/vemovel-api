import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CadtpgModule } from './cadtpg/cadtpg.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

@Module({
  imports: [CadtpgModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
