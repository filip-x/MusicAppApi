import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist';
import { Song } from './entities/song';
import { Album } from './entities/album';
import { Playlist } from './entities/playlist';
import { User } from './entities/user';
import { ArtistController } from './controllers/artist.controller';
import { AlbumController } from './controllers/album.controller';
import { PlaylistController } from './controllers/playlist.controller';
import { SongController } from './controllers/song.controller';
import { UserController } from './controllers/user.controller';
import { ArtistService } from './services/artist.service';
import { AlbumService } from './services/album.service';
import { PlaylistService } from './services/playlist.service';
import { SongService } from './services/song.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'filipmusic',
      password: 'filip20',
      database: 'musicapp',
      entities: [Artist, Song, Album, Playlist, User],
      synchronize: true,
    }),
  ],
  controllers: [
    ArtistController,
    AlbumController,
    PlaylistController,
    SongController,
    UserController,
  ],
  providers: [
    ArtistService,
    AlbumService,
    PlaylistService,
    SongService,
    UserService,
  ],
})
export class AppModule {}
