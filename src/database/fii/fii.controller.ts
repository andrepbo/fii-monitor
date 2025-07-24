import { Get, Controller, Post, Body } from '@nestjs/common';
import { FiiService } from './fii.service';
import { FiiEntity } from '../entities/fii.entity/fii.entity';

@Controller('fiis')
export class FiiController {
  constructor(private readonly fiiService: FiiService) {}

  @Get()
  async findAll(): Promise<FiiEntity[]> {
    return this.fiiService.findAll();
  }

  @Post()
  async upsert(@Body() data: Partial<FiiEntity>): Promise<FiiEntity> {
    return this.fiiService.upsertFii(data);
  }
}
