import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { CadtpgModule } from './cadtpg/cadtpg.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CadtpgModule, ConfigModule.forRoot({ isGlobal: true })],
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
