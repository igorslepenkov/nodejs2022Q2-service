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
  getAllUsers() {
    return this.userService.findAll();
  }

  @Get(':id')
  getUserById(@Param() { id }: FindOneParams) {
    const user = this.userService.findById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param() { id }: FindOneParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const response = this.userService.update(id, updatePasswordDto);
    if (response) {
      return response;
    } else if (response === 'wrong password') {
      throw new ForbiddenException('Wrong previous password');
    } else {
      throw new NotFoundException('User with such id not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param() { id }: FindOneParams) {
    const response = this.userService.delete(id);
    if (response) {
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
