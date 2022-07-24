import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { FindOneParams } from './dto/findOneParams.dto';
import { UpdatePasswordDto } from './dto/updatePassword.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param() { id }: FindOneParams) {
    const user = await this.userService.findById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updatePassword(
    @Param() { id }: FindOneParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const response = await this.userService.update(id, updatePasswordDto);
    if (response && response !== 'wrong password') {
      return response;
    } else if (response === 'wrong password') {
      throw new ForbiddenException('Wrong old password');
    } else {
      throw new NotFoundException('User with such id not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() { id }: FindOneParams) {
    const response = await this.userService.delete(id);
    if (response) {
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
