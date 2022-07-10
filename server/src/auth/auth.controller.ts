import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly $authService: AuthService) {}

  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.$authService.login({
      email: email,
      password: password,
      response: response,
    });
  }

  @Post('register')
  public async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.$authService.register({
      name: name,
      email: email,
      password: password,
    });
  }
}
