import { Module } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { DataIngestionController } from './data-ingestion.controller';
import { HttpModule } from '@nestjs/axios';
import { FiiModule } from 'src/database/fii/fii.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';

@Module({
  imports: [HttpModule, FiiModule, TypeOrmModule.forFeature([FiiQuoteEntity])],
  providers: [DataIngestionService],
  controllers: [DataIngestionController],
})
export class DataIngestionModule {}
