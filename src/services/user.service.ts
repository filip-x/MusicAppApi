import { User } from '../entities/user';
import { UserDto } from '../dto/userDto';
import { NotFoundException } from '@nestjs/common';

export class UserService {
  getAll() {
    return User.find();
  }

  async createUser(body: UserDto) {
    const userName = await User.findOne({ where: { username: body.username } });
    if (userName) {
      throw new NotFoundException('No User was found with this username!');
    }
    return User.create({ ...body }).save();
  }

  async updateUser(id: string, body: UserDto) {
    const user_id = await User.findOne({ where: { id } });
    if (!user_id) {
      throw new NotFoundException('No User was found with this id');
    }
    const userName = body.username;
    delete body.username;
    const password = body.password;
    delete body.password;
    const updatedUser: Partial<User> = {
      ...body,
    };
    if (!userName) {
      throw new NotFoundException('No User was found with this username!');
    }
    updatedUser.username = userName;
    updatedUser.password = password;
    await User.update(id, updatedUser);
    return true;
  }

  async deleteUser(id: string) {
    const userName = await User.findOne({ where: { id } });
    if (!userName) {
      throw new NotFoundException('No User was found with this id');
    }
    await User.delete(userName.id);
    return true;
  }
}
