import { Controller, Post, Req, Res, UseGuards, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const encodeUser = req.user as UserEntity;
    const encode = await this.authService.generateJWT(encodeUser);
    res.header('Content-Type', 'application/json');
    res.cookie('accessToken', encode.accessToken);
    res.write(JSON.stringify(encode));
    res.end();
  }
}
