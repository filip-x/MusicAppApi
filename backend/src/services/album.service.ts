import { Album } from '../entities/album';
import { AlbumDto } from '../dto/albumDto';
import { NotFoundException } from '@nestjs/common';

export class AlbumService {
  getAll() {
    return Album.find();
  }

  async createAlbum(body: AlbumDto) {
    const albumName = await Album.findOne({ where: { name: body.name } });
    if (albumName) {
      throw new NotFoundException('We found an album with this name !');
    }
    return Album.create({ ...body }).save();
  }

  async updateAlbum(id: string, body: AlbumDto) {
    const albumId = await Album.findOne({ where: { id } });
    if (!albumId) {
      throw new NotFoundException('No Album was found with this id ');
    }
    const name = body.name;
    delete body.name;
    const updatedAlbum: Partial<Album> = {
      ...body,
    };
    updatedAlbum.name = name;
    await Album.update(id, updatedAlbum);
    return true;
  }

  async deleteAlbum(id: string) {
    const albumId = await Album.findOne({ where: { id } });
    if (!albumId) {
      throw new NotFoundException('No Album was found with this id ');
    }
    await Album.delete(albumId.id);
    return true;
  }
}
