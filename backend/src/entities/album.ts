import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist';
import { Song } from './song';

@Entity('album')
export class Album extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Artist, (artist) => artist.id)
  artist: Artist;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Song, (song) => song.id)
  song: Song[];
}
