import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { IUser } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { userToOutput } from './userMutations';

@Injectable()
export class UserService {
  private users: IUser[] = [];

  findAll() {
    return this.users.map(userToOutput);
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    return userToOutput(user);
  }

  create({ login, password }: CreateUserDto) {
    const newUser: IUser = {
      id: uuidv4(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: 0,
    };

    this.users.push(newUser);

    return userToOutput(newUser);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);

    if (user && oldPassword === user.password) {
      user.password = newPassword;
      user.updatedAt = Date.now();
      return userToOutput(user);
    } else if (user && oldPassword !== user.password) {
      return 'wrong password';
    } else {
      return null;
    }
  }

  delete(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return true;
    } else {
      return false;
    }
  }
}
