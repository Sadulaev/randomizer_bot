import { EventStatus } from 'src/types/event.types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'active' })
  status: EventStatus;

  @Column({ nullable: true, default: null })
  images: string;

  @Column({ nullable: true, default: null })
  description: string | null;

  @Column({ default: 1 })
  winners: number;

  @Column({ nullable: true, default: null })
  subscriptions: string | null;

  @Column({type: 'date', nullable: true})
  endtime: string | null;
}
