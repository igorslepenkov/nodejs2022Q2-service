import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserEntity } from './entities/user.entity';
import { IUserOutput } from './interfaces';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPassword: string | undefined = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  async create(userDto: CreateUserDto): Promise<IUserOutput | null> {
    const hashedPassword = await this.hashPassword(userDto.password);
    userDto.password = hashedPassword;

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

  async findUserByLogin(login: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { login } });
    return user;
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      const compare = await bcrypt.compare(oldPassword, user.password);
      if (compare) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        return (await this.userRepository.save(user)).toResponse();
      } else {
        return 'wrong password';
      }
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
