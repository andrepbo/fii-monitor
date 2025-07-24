import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { FiiService } from 'src/database/fii/fii.service';

@Injectable()
export class DataIngestionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly fiiService: FiiService,
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
        await this.fiiService.upsertFii({
          ticker: quote.symbol,
          name: quote.longName || quote.shortName || quote.symbol,
          sector: quote.sector || 'Unknown',
          pvp: quote.priceEarnings || 0,
          dividendYield: quote.earningsPerShare || 0,
        });
      }

      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch data for ${ticker}: ${error.response?.status || error.message}`,
      );
    }
  }
}
