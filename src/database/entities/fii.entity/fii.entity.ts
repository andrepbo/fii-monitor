import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fiis')
export class FiiEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ticker: string;

  @Column()
  name: string;

  @Column()
  sector: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  pvp: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  dividendYield: number;
}
