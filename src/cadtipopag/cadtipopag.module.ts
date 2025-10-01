import { Module } from '@nestjs/common';
import { CadtipopagService } from './cadtipopag.service';
import { CadtipopagController } from './cadtipopag.controller';

@Module({
  controllers: [CadtipopagController],
  providers: [CadtipopagService],
})
export class CadtipopagModule {}
