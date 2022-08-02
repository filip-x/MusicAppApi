import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist';
import { User } from './user';
import { Song } from './song';

export class Playlist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => User, (user) => user.id)
  user: User;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Song, (song) => song.id)
  song: Song;
}
