import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataIngestionController } from './data-ingestion.controller';
import { DataIngestionService } from './data-ingestion.service';

describe('DataIngestionController (e2e)', () => {
  let app: INestApplication;
  const mockDataIngestionService = {
    fetchAndSaveQuote: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [DataIngestionController],
      providers: [
        { provide: DataIngestionService, useValue: mockDataIngestionService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('/data-ingestion/quote?ticker=PETR4 (GET)', async () => {
    mockDataIngestionService.fetchAndSaveQuote.mockResolvedValue({
      results: [{ symbol: 'PETR4', price: 31.99 }],
    });

    const response = await request(app.getHttpServer())
      .get('/data-ingestion/quote?ticker=PETR4')
      .expect(200);

    expect(response.body).toHaveProperty('results');
    expect(response.body.results[0]).toHaveProperty('symbol', 'PETR4');
  });
});
