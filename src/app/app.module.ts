import { Module } from '@nestjs/common';
import { CadtipopagModule } from 'src/cadtipopag/cadtipopag.module';
import { EmpresaModule } from 'src/empresa/empresa.module';
import { PrazoModule } from 'src/prazo/prazo.module';
import { DatabaseModule } from 'src/db/database.module';
import { AppService } from './app.service';

@Module({
  imports: [DatabaseModule, EmpresaModule, PrazoModule, CadtipopagModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
