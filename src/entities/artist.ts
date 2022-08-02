import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Album } from './album';
import { Song } from './song';

@Entity('artist')
export class Artist extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  starting_date: Date;

  @OneToMany(() => Album, (album) => album.id)
  album: Album[];

  @ManyToOne(() => Song, (song) => song.id)
  song: Song[];
}
