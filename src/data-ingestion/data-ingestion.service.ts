import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';
import { FiiService } from 'src/database/fii/fii.service';
import { Repository } from 'typeorm';

@Injectable()
export class DataIngestionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fiiService: FiiService,
    @InjectRepository(FiiQuoteEntity)
    private readonly quoteRepository: Repository<FiiQuoteEntity>,
  ) {}

  async fetchAndSaveQuote(ticker: string): Promise<any> {
    const token = process.env.BRAPI_TOKEN;
    const url = `https://brapi.dev/api/quote/${ticker}`;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );

      const quote = response.data?.results?.[0];
      if (quote) {
        const fii = await this.fiiService.upsertFii({
          ticker: quote.symbol,
          name: quote.longName || quote.shortName || quote.symbol,
          sector: quote.sector || 'Unknown',
          pvp: quote.priceEarnings || 0,
          dividendYield: quote.earningsPerShare || 0,
        });

        const newQuote = this.quoteRepository.create({
          fii,
          price: quote.regularMarketPrice || 0,
          dividendYield: quote.dividendYield || 0,
        });
        await this.quoteRepository.save(newQuote);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch data for ${ticker}: ${error.response?.status || error.message}`,
      );
    }
  }
}
