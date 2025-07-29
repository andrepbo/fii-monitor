import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FiiEntity } from '../fii.entity/fii.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('fii_quotes')
export class FiiQuoteEntity {
  @ApiProperty({ description: 'Unique identifier of the quote', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The FII associated with this quote',
    type: () => FiiEntity,
  })
  @ManyToOne(() => FiiEntity, (fii) => fii.quotes, { onDelete: 'CASCADE' })
  fii: FiiEntity;

  @ApiProperty({
    description: 'Price of the FII at the recorded time',
    example: 115.25,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Dividend yield at the recorded time',
    example: 0.85,
    nullable: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dividendYield: number;

  @ApiProperty({
    description: 'Date and time when this quote was recorded',
    example: '2025-07-28T18:25:43.511Z',
  })
  @CreateDateColumn({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
  })
  recordedAt: Date;
}
