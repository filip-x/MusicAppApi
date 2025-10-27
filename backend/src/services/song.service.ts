import { Song } from '../entities/song';
import { SongDto } from '../dto/songDto';
import { NotFoundException } from '@nestjs/common';
import { Album } from '../entities/album';

export class SongService {
  getAll() {
    return Song.find();
  }

  async createSong(body: SongDto) {
    const song = await Song.findOne({ where: { name: body.name } });
    if (song) {
      throw new NotFoundException('We found a song with this name!');
    }
    return Song.create({ ...body }).save();
  }

  async updateSong(id: string, body: SongDto) {
    const songId = await Song.findOne({ where: { id } });
    if (!songId) {
      throw new NotFoundException('No Song was found with this id ');
    }
    const name = body.name;
    delete body.name;
    const updatedSong: Partial<Song> = {
      ...body,
    };
    updatedSong.name = name;
    await Song.update(id, updatedSong);
    return true;
  }

  async deleteSong(id: string) {
    const songId = await Song.findOne({ where: { id } });
    if (!songId) {
      throw new NotFoundException('No Song was found with this id!');
    }
    await Song.delete(songId.id);
    return true;
  }
}
