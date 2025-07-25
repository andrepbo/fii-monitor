import { INestApplication } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { Repository } from 'typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FiiEntity } from 'src/database/entities/fii.entity/fii.entity';
import { FiiService } from 'src/database/fii/fii.service';
import { of } from 'rxjs';

describe('DataIngestionService (integration)', () => {
  let app: INestApplication;
  let service: DataIngestionService;
  let quoteRepository: Repository<FiiQuoteEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [FiiEntity, FiiQuoteEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([FiiEntity, FiiQuoteEntity]),
      ],
      providers: [
        DataIngestionService,
        FiiService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(
              of({
                data: {
                  results: [
                    {
                      symbol: 'PETR4',
                      regularMarketPrice: 32.5,
                      dividendYield: 0.08,
                      longName: 'Petrobras',
                      sector: 'Energia',
                    },
                  ],
                },
              }),
            ),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<DataIngestionService>(DataIngestionService);
    quoteRepository = moduleFixture.get<Repository<FiiQuoteEntity>>(
      getRepositoryToken(FiiQuoteEntity),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch and persist quote data for PETR4', async () => {
    const mockData = {
      results: [
        {
          symbol: 'PETR4',
          regularMarketPrice: 32.5,
          dividendYield: 0.08,
          longName: 'Petrobras',
          sector: 'Energia',
        },
      ],
    };

    (service as any).getQuote = jest.fn().mockResolvedValue(mockData);

    const result = await service.fetchAndSaveQuote('PETR4');
    expect(result.results[0].symbol).toBe('PETR4');

    const savedQuotes = await quoteRepository.find({ relations: ['fii'] });
    expect(savedQuotes.length).toBe(1);
    expect(savedQuotes[0].fii.ticker).toBe('PETR4');
  });
});
