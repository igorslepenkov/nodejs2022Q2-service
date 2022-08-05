import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { Public } from 'src/meta/public';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/signUp.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.loginUser(req.user);
  }

  // @Public()
  // @Post('/refresh')
  // async refresh(@Body() refreshDto: RefreshDto) {
  //   return this.authService.loginUser(req.user);
  // }
}
