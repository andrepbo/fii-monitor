import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiModule } from './fii.module';

describe('FiiController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/../entities/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        FiiModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/fiis (POST) should insert a FII', async () => {
    const response = await request(app.getHttpServer())
      .post('/fiis')
      .send({
        ticker: 'TEST11',
        name: 'Test Fund',
        sector: 'Logística',
        pvp: 1.05,
        dividendYield: 0.75,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.ticker).toBe('TEST11');
  });

  it('/fiis (GET) should return a list of FIIs', async () => {
    const response = await request(app.getHttpServer())
      .get('/fiis')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
