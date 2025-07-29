import { Controller, Get, Query } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';

@ApiTags('Data Ingestion')
@Controller('data-ingestion')
export class DataIngestionController {
  constructor(private readonly dataIngestionService: DataIngestionService) {}

  @Get('quote')
  @ApiOperation({ summary: 'Fetch and save quote for a given ticker' })
  @ApiQuery({
    name: 'ticker',
    required: true,
    description: 'Ticker symbol of the FII',
    example: 'HGLG11',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the fetched quote data',
    type: FiiQuoteEntity,
  })
  @ApiResponse({ status: 400, description: 'Invalid ticker or API error' })
  async getQuote(@Query('ticker') ticker: string) {
    return this.dataIngestionService.fetchAndSaveQuote(ticker);
  }
}
