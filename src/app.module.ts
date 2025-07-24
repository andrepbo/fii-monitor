import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DataIngestionModule } from './data-ingestion/data-ingestion.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DataIngestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
