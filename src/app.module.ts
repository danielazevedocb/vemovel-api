import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Database } from './db/database';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [AppService, Database],
})
export class AppModule {}
