import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column({ nullable: true, default: null })
  firstName: string | null;

  @Column({ nullable: true, default: null })
  lastName: string | null;

  @Column({ nullable: true, default: null })
  username: string;
}
