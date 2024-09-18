import { Module } from '@nestjs/common';
import { CadtpgService } from './cadtpg.service';
import { CadtpgController } from './cadtpg.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CadtpgService],
  controllers: [CadtpgController],
})
export class CadtpgModule {}
