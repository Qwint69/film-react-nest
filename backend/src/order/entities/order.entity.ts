import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column('jsonb')
  tickets: Array<{
    film: string;
    session: string;
    daytime: string;
    day: string;
    time: string;
    row: number;
    seat: number;
    price: number;
  }>;
}
