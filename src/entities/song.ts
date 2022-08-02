import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from './artist';
import { Album } from './album';
import { JoinTable } from 'typeorm/browser';
import { Playlist } from './playlist';

@Entity('song')
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.id)
  artist: Artist;

  @ManyToOne(() => Album, (album) => album.id)
  album: Album;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(() => Playlist)
  playlist: Playlist[];
}
