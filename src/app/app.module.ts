import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { CadtipopagModule } from 'src/cadtipopag/cadtipopag.module';
import { PrazoModule } from 'src/prazo/prazo.module';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, PrazoModule, CadtipopagModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
