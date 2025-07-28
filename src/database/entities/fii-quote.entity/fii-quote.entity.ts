import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FiiEntity } from '../fii.entity/fii.entity';

@Entity('fii_quotes')
export class FiiQuoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => FiiEntity, (fii) => fii.quotes, { onDelete: 'CASCADE' })
  fii: FiiEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  dividendYield: number;

  @CreateDateColumn({ type: 'timestamp' })
  recordedAt: Date;
}
