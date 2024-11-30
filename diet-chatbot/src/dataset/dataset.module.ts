import { Module } from '@nestjs/common';
import { DatasetService } from './dataset.service';

@Module({
  providers: [DatasetService],
  exports: [DatasetService], // Esporta DatasetService per essere utilizzato in altri moduli
})
export class DatasetModule {}
