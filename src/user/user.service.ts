import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: CreateUserDto) {
    const createdUser = this.userRepository.create(userDto);
    const savedUser = await this.userRepository.save(createdUser);
    if (savedUser) {
      return savedUser.toResponse();
    } else {
      return null;
    }
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map((user) => user.toResponse());
  }

  async findById(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (user) {
      return user.toResponse();
    } else {
      return null;
    }
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user && oldPassword === user.password) {
      user.password = newPassword;
      return (await this.userRepository.save(user)).toResponse();
    } else if (user && oldPassword !== user.password) {
      return 'wrong password';
    } else {
      return null;
    }
  }

  async delete(id: string) {
    const response = await this.userRepository.delete(id);
    if (response.affected !== 0) {
      return true;
    } else {
      return false;
    }
  }
}
