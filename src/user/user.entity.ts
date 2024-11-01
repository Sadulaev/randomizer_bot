import { Event } from 'src/event/event.entity';
import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({name: 'participants'})
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, default: null })
  firstName: string | null;

  @Column({ nullable: true, default: null })
  lastName: string | null;

  @Column({ nullable: true, default: null })
  username: string;

  @ManyToMany(() => Event, (event) => event.users)
  @JoinTable()
  events: Event[];
}
