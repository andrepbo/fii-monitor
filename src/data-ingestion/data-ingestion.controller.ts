import { Controller, Get, Query } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';

@Controller('data-ingestion')
export class DataIngestionController {
  constructor(private readonly dataIngestionService: DataIngestionService) {}

  @Get('quote')
  async getQuote(@Query('ticker') ticker: string) {
    return this.dataIngestionService.fetchAndSaveQuote(ticker);
  }
}
