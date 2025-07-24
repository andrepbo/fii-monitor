import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataIngestionModule } from './data-ingestion.module';
import { DataIngestionService } from './data-ingestion.service';

describe('DataIngestionController (e2e)', () => {
  let app: INestApplication;
  let service: DataIngestionService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DataIngestionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    service = moduleFixture.get<DataIngestionService>(DataIngestionService);

    jest.spyOn(service, 'getQuote').mockResolvedValue({
      results: [{ symbol: 'PETR4', price: 31.99 }],
    });

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/data-ingestion/quote?ticker=PETR4 (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/data-ingestion/quote?ticker=PETR4')
      .expect(200);

    expect(response.body).toHaveProperty('results');
    expect(response.body.results[0]).toHaveProperty('symbol', 'PETR4');
  });
});
