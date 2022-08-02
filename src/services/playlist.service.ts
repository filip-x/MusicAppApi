import { Playlist } from '../entities/playlist';
import { NotFoundException } from '@nestjs/common';
import { PlaylistDto } from '../dto/playlistDto';

export class PlaylistService {
  getAll() {
    return Playlist.find();
  }

  async createPlaylist(body: PlaylistDto) {
    const playlist = await Playlist.findOne({ where: { name: body.name } });
    if (playlist) {
      throw new NotFoundException('We found a playlist with  this name ');
    }
    return Playlist.create({ ...body }).save();
  }

  async updatePlaylist(id: string, body: PlaylistDto) {
    const playlistId = await Playlist.findOne({ where: { id } });
    if (!playlistId) {
      throw new NotFoundException('No Playlist was found with this id ');
    }
    const name = body.name;
    delete body.name;
    const updatedPlaylist: Partial<Playlist> = {
      ...body,
    };
    if (!name) {
      throw new NotFoundException('No Playlist was found with this name!');
    }
    updatedPlaylist.name = name;
    await Playlist.update(id, updatedPlaylist);
    return true;
  }

  async deletePlaylist(id: string) {
    const playlist_id = await Playlist.findOne({ where: { id } });
    if (!playlist_id) {
      throw new NotFoundException('No Playlist was found with this id');
    }
    await Playlist.delete(playlist_id.id);
    return true;
  }
}
