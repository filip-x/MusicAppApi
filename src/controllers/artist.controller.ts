import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArtistService } from '../services/artist.service';
import { ArtistDto } from '../dto/artistDto';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}
  @Get('/')
  async getArtists() {
    return this.artistService.getAll();
  }
  @Post('/')
  async createArtist(@Body() body: ArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put('/:id')
  async updateArtist(@Param('id') id: string, @Body() body: ArtistDto) {
    return this.artistService.updateArtist(id, body);
  }

  @Delete('/:id')
  async deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
