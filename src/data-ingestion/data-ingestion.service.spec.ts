import { Test, TestingModule } from '@nestjs/testing';
import { DataIngestionService } from './data-ingestion.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FiiService } from '../database/fii/fii.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';

describe('DataIngestionService', () => {
  let service: DataIngestionService;
  let httpService: HttpService;
  let mockFiiService: Partial<FiiService>;

  beforeEach(async () => {
    mockFiiService = {
      upsertFii: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        DataIngestionService,
        { provide: FiiService, useValue: mockFiiService },
        {
          provide: getRepositoryToken(FiiQuoteEntity),
          useValue: { create: jest.fn(), save: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DataIngestionService>(DataIngestionService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return quote data when API succeeds', async () => {
    const mockResponse: AxiosResponse = {
      data: { results: [{ symbol: 'PETR4', price: 31.99 }] },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} } as any,
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

    const result = await service.fetchAndSaveQuote('PETR4');
    expect(result).toEqual(mockResponse.data);
    expect(mockFiiService.upsertFii).toHaveBeenCalled();
  });

  it('should throw error when API fails', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => {
      throw new Error('API error');
    });

    await expect(service.fetchAndSaveQuote('PETR4')).rejects.toThrow(
      'Failed to fetch data for PETR4',
    );
  });
});
