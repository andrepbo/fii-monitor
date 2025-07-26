import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiQuoteEntity } from 'src/database/entities/fii-quote.entity/fii-quote.entity';
import { FiiEntity } from 'src/database/entities/fii.entity/fii.entity';
import { FiiQuoteService } from './fii-quote.service';

@Module({
  imports: [TypeOrmModule.forFeature([FiiQuoteEntity, FiiEntity])],
  providers: [FiiQuoteService],
  exports: [FiiQuoteService],
})
export class FiiQuoteModule {}
