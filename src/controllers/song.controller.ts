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
import { SongService } from '../services/song.service';
import { SongDto } from '../dto/songDto';

@Controller('song')
@ApiTags('Song')
export class SongController {
  constructor(private readonly songService: SongService) {}
  @Get('/')
  async getSongs() {
    return this.songService.getAll();
  }
  @Post('/')
  async createSong(@Body() body: SongDto) {
    return this.songService.createSong(body);
  }

  @Put('/:id')
  async updateSong(@Param('id') id: string, @Body() body: SongDto) {
    return this.songService.updateSong(id, body);
  }

  @Delete('/:id')
  async deleteSong(@Param('id') id: string) {
    return this.songService.deleteSong(id);
  }
}
