import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';
import { FiiEntity } from 'src/database/entities/fii.entity/fii.entity';
import { FiiQuoteService } from './fii-quote.service';
import { Repository } from 'typeorm';

describe('FiiQuoteService', () => {
  let service: FiiQuoteService;
  let quoteRepository: Repository<FiiQuoteEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [FiiEntity, FiiQuoteEntity],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([FiiEntity, FiiQuoteEntity]),
      ],
      providers: [FiiQuoteService],
    }).compile();

    service = module.get<FiiQuoteService>(FiiQuoteService);
    quoteRepository = module.get('FiiQuoteEntityRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a FII and save a quote', async () => {
    const quote = await service.saveQuote('HGLG11', 170.5, 0.8);
    expect(quote).toBeDefined();
    expect(quote.fii.ticker).toBe('HGLG11');

    const savedQuotes = await quoteRepository.find({ relations: ['fii'] });
    expect(savedQuotes.length).toBe(1);
    expect(savedQuotes[0].price).toBe(170.5);
  });

  it('should return quotes for a given ticker', async () => {
    await service.saveQuote('KNRI11', 150.2, 0.7);
    const quotes = await service.getQuotesByTicker('KNRI11');
    expect(quotes.length).toBeGreaterThan(0);
    expect(quotes[0].fii.ticker).toBe('KNRI11');
  });

  it('should return empty array if ticker has no quotes', async () => {
    const quotes = await service.getQuotesByTicker('INVALID11');
    expect(quotes).toEqual([]);
  });
});
