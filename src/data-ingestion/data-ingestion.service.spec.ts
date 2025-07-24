import { Test, TestingModule } from '@nestjs/testing';
import { DataIngestionService } from './data-ingestion.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('DataIngestionService', () => {
  let service: DataIngestionService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [DataIngestionService],
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

    const result = await service.getQuote('PETR4');
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw error when API fails', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() => {
      throw new Error('API error');
    });

    await expect(service.getQuote('PETR4')).rejects.toThrow(
      'Failed to fetch data for PETR4',
    );
  });
});
