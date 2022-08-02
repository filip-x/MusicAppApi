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
import { PlaylistService } from '../services/playlist.service';
import { PlaylistDto } from '../dto/playlistDto';

@Controller('playlist')
@ApiTags('Playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}
  @Get('/')
  async getPlaylists() {
    return this.playlistService.getAll();
  }
  @Post('/')
  async createPlaylist(@Body() body: PlaylistDto) {
    return this.playlistService.createPlaylist(body);
  }

  @Put('/:id')
  async updatePlaylist(@Param('id') id: string, @Body() body: PlaylistDto) {
    return this.playlistService.updatePlaylist(id, body);
  }

  @Delete('/:id')
  async deletePlaylist(@Param('id') id: string) {
    return this.playlistService.deletePlaylist(id);
  }
}
