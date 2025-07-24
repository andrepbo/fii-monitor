import { Module } from '@nestjs/common';
import { FiiModule } from './fii/fii.module';

@Module({
  imports: [FiiModule],
})
export class DatabaseModule {}
