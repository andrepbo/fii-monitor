import { Module } from '@nestjs/common';
import { FiiService } from './fii.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiEntity } from '../entities/fii.entity/fii.entity';
import { FiiController } from './fii.controller';
import { FiiQuoteEntity } from '../entities/fii-quote.entity/fii-quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FiiEntity, FiiQuoteEntity])],
  controllers: [FiiController],
  providers: [FiiService],
  exports: [FiiService],
})
export class FiiModule {}
