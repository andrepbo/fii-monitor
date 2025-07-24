import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { FiiEntity } from '../fii.entity/fii.entity';
import { FiiQuoteEntity } from './fii-quote.entity';

describe('FiiQuoteEntity (persistence)', () => {
  let module: TestingModule;
  let dataSource: DataSource;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [FiiEntity, FiiQuoteEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([FiiEntity, FiiQuoteEntity]),
      ],
    }).compile();

    dataSource = module.get<DataSource>(getDataSourceToken());
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should create a Fii and add a quote', async () => {
    const fii = dataSource.manager.create(FiiEntity, {
      ticker: 'HGLG11',
      name: 'CSHG Logística',
      sector: 'Logística',
      pvp: 0.95,
      dividendYield: 0.8,
    });
    await dataSource.manager.save(fii);

    const quote = dataSource.manager.create(FiiQuoteEntity, {
      fii,
      price: 170.5,
      dividendYield: 0.8,
    });
    await dataSource.manager.save(quote);

    const savedQuotes = await dataSource.manager.find(FiiQuoteEntity, {
      relations: ['fii'],
    });
    expect(savedQuotes.length).toBe(1);
    expect(savedQuotes[0].fii.ticker).toBe('HGLG11');
  });
});
