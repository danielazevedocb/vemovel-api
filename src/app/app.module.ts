import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { PrazoModule } from 'src/prazo/prazo.module';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, PrazoModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
