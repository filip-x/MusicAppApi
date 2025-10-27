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
import { AlbumService } from '../services/album.service';
import { AlbumDto } from '../dto/albumDto';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  @Get('/')
  async getAlbums() {
    return this.albumService.getAll();
  }
  @Post('/')
  async createAlbum(@Body() body: AlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put('/:id')
  async updateAlbum(@Param('id') id: string, @Body() body: AlbumDto) {
    return this.albumService.updateAlbum(id, body);
  }

  @Delete('/:id')
  async deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
