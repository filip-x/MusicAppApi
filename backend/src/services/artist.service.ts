import { Artist } from '../entities/artist';
import { ArtistDto } from '../dto/artistDto';
import { NotFoundException } from '@nestjs/common';

export class ArtistService {
  getAll() {
    return Artist.find();
  }

  async createArtist(body: ArtistDto) {
    const name = await Artist.findOne({ where: { name: body.name } });
    if (name) {
      throw new NotFoundException('We found an artist with this name !');
    }
    return Artist.create({ ...body }).save();
  }

  async updateArtist(id: string, body: ArtistDto) {
    const artistId = await Artist.findOne({ where: { id } });
    if (!artistId) {
      throw new NotFoundException('No Artist was found with this id ');
    }
    const name = body.name;
    delete body.name;
    const startDate = body.starting_date;
    delete body.starting_date;
    const updatedArtist: Partial<Artist> = {
      ...body,
    };
    if (!name) {
      throw new NotFoundException('No Artist was found with this name!');
    }
    updatedArtist.name = name;
    updatedArtist.starting_date = startDate;
    await Artist.update(id, updatedArtist);
    return true;
  }

  async deleteArtist(id: string) {
    const artistId = await Artist.findOne({ where: { id } });
    if (!artistId) {
      throw new NotFoundException('No Artist was found with this id!');
    }
    await Artist.delete(artistId.id);
    return true;
  }
}
