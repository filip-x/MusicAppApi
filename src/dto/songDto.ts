import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from './artist';
import { Album } from './album';

export class Song extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Artist, (artist) => artist.id)
  artist: Artist;

  @OneToMany(() => Album, (album) => album.id)
  album: Album;

  @Column({ nullable: true })
  name: string;
}
