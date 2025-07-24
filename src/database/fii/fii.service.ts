import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FiiEntity } from '../entities/fii.entity/fii.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FiiService {
  constructor(
    @InjectRepository(FiiEntity)
    private readonly fiiRepository: Repository<FiiEntity>,
  ) {}

  async upsertFii(data: Partial<FiiEntity>): Promise<FiiEntity> {
    let existing = await this.fiiRepository.findOne({
      where: { ticker: data.ticker },
    });
    if (existing) {
      existing = Object.assign(existing, data);
      return this.fiiRepository.save(existing);
    }
    return this.fiiRepository.save(this.fiiRepository.create(data));
  }

  async findAll(): Promise<FiiEntity[]> {
    return this.fiiRepository.find();
  }

  async findByTicker(ticker: string): Promise<FiiEntity | null> {
    return this.fiiRepository.findOne({ where: { ticker } });
  }
}
