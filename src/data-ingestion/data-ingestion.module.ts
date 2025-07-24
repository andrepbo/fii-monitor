import { Module } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { DataIngestionController } from './data-ingestion.controller';
import { HttpModule } from '@nestjs/axios';
import { FiiModule } from 'src/database/fii/fii.module';

@Module({
  imports: [HttpModule, FiiModule],
  providers: [DataIngestionService],
  controllers: [DataIngestionController],
})
export class DataIngestionModule {}
