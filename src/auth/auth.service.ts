import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findUserByLogin(login);
    if (!user) {
      return null;
    } else {
      const compare = await bcrypt.compare(pass, user.password);
      if (compare) {
        return user.toResponse();
      } else {
        return 'invalid password';
      }
    }
  }

  async signUp(signUpDto: SignUpDto) {
    return await this.usersService.create(signUpDto);
  }

  async loginUser({ username, password }: LoginDto) {
    const user = await this.validateUser(username, password);
    return user;
  }
}
