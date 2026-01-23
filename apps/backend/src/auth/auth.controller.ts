import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { token, maxAgeMs } = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('session', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: maxAgeMs,
      path: '/',
    });

    res.redirect('/');
  }

  @Post('logout')
  logout(@Res() res: Response): void {
    const isProduction = process.env.NODE_ENV === 'production';

    res.clearCookie('session', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
    });

    res.status(204).send();
  }
}
