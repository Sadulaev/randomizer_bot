import { EventStatus } from 'src/enums/event.enum';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: EventStatus.InProgress })
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

  @ManyToMany(() => User, (user) => user.events)
  users: User[];
}
