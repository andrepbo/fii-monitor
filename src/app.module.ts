import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataIngestionModule } from './data-ingestion/data-ingestion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { FiiQuoteService } from './fii-quote/fii-quote.service';
import { FiiQuoteModule } from './fii-quote/fii-quote.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432')),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASS', 'postgres'),
        database: config.get<string>('DB_NAME', 'fii_monitor'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    DataIngestionModule,
    DatabaseModule,
    FiiQuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, FiiQuoteService],
})
export class AppModule {}
