import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { DatasetModule } from '../dataset/dataset.module';


@Module({
  imports: [DatasetModule],
  providers: [AiService],
  exports: [AiService], 
})
export class AiModule {}
