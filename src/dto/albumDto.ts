import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist';
import { Song } from './song';

export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.id)
  artist: Artist;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Song, (song) => song.id)
  song: Song;
}
