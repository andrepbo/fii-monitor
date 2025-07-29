import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FiiQuoteEntity } from '../fii-quote.entity/fii-quote.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fiis')
export class FiiEntity {
  @ApiProperty({ description: 'Unique identifier of the FII', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Ticker symbol of the FII', example: 'HGLG11' })
  @Column({ unique: true })
  ticker: string;

  @ApiProperty({
    description: 'Full name of the FII',
    example: 'CSHG Logística',
  })
  @Column()
  name: string;

  @ApiProperty({ description: 'Sector of the FII', example: 'Logística' })
  @Column()
  sector: string;

  @ApiProperty({ description: 'Price-to-book ratio (P/VP)', example: 0.95 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  pvp: number;

  @ApiProperty({ description: 'Dividend yield percentage', example: 0.8 })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  dividendYield: number;

  @ApiProperty({
    description: 'List of historical quotes for this FII',
    type: () => [FiiQuoteEntity],
  })
  @OneToMany(() => FiiQuoteEntity, (quote) => quote.fii)
  quotes: FiiQuoteEntity[];
}
