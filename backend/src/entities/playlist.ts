import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Song } from './song';

@Entity('playlist')
export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => Song)
  @JoinTable()
  song: Song[];
}
