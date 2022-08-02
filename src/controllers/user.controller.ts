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
import { UserService } from '../services/user.service';
import { UserDto } from '../dto/userDto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/')
  async getUsers() {
    return this.userService.getAll();
  }
  @Post('/')
  async createUser(@Body() body: UserDto) {
    return this.userService.createUser(body);
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
