import { Module } from '@nestjs/common';
import { FiiService } from './fii.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiEntity } from '../entities/fii.entity/fii.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FiiEntity])],
  providers: [FiiService],
  exports: [FiiService],
})
export class FiiModule {}
