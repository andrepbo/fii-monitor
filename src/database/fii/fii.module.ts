import { Module } from '@nestjs/common';
import { FiiService } from './fii.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FiiEntity } from '../entities/fii.entity/fii.entity';
import { FiiController } from './fii.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FiiEntity])],
  controllers: [FiiController],
  providers: [FiiService],
  exports: [FiiService],
})
export class FiiModule {}
