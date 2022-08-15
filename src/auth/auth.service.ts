import { Injectable } from '@nestjs/common';
import { IUserOutput } from 'src/user/interfaces';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/signUp.dto';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    login: string,
    pass: string,
  ): Promise<IUserOutput | string> {
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

  async loginUser({ id, login }: IUserOutput) {
    const payload = { username: login, sub: id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
