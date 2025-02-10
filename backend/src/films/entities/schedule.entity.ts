import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from './film.entity.';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column('float')
  price: number;

  @Column()
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  film: Film;
}
