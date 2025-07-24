import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DataIngestionService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches real-time quote data for a given ticker from Brapi API.
   * @param ticker Stock or FII ticker (e.g., PETR4 or HGLG11).
   */
  async getQuote(ticker: string): Promise<any> {
    const token = process.env.BRAPI_TOKEN;
    const url = `https://brapi.dev/api/quote/${ticker}`;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        `Failed to fetch data for ${ticker}: ${error.response?.status || error.message}`,
      );
    }
  }
}
