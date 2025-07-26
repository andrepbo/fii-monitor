import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';
import { FiiEntity } from 'src/database/entities/fii.entity/fii.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FiiQuoteService {
  constructor(
    @InjectRepository(FiiQuoteEntity)
    private readonly quoteRepository: Repository<FiiQuoteEntity>,
    @InjectRepository(FiiEntity)
    private readonly fiiRepository: Repository<FiiEntity>,
  ) {}

  async saveQuote(
    ticker: string,
    price: number,
    dividendYield: number,
  ): Promise<FiiQuoteEntity> {
    let fii = await this.fiiRepository.findOne({ where: { ticker } });

    if (!fii) {
      fii = this.fiiRepository.create({
        ticker,
        name: ticker,
        sector: 'Unknown',
        pvp: 0,
        dividendYield,
      });
      await this.fiiRepository.save(fii);
    }

    const quote = this.quoteRepository.create({
      fii,
      price,
      dividendYield,
      recordedAt: new Date(),
    });

    return this.quoteRepository.save(quote);
  }

  async getQuotesByTicker(ticker: string): Promise<FiiQuoteEntity[]> {
    return this.quoteRepository.find({
      where: { fii: { ticker } },
      relations: ['fii'],
      order: { recordedAt: 'DESC' },
    });
  }
}
