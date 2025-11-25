/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { type Request } from 'express';
import { JwtAuthGuard } from './gurad/jwt-auth.guard';
import { CurrentUser } from './devorators/current-user.decorator';
import { User } from 'src/users/types/user-schema.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  public login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto)
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@Req() req: Request, @CurrentUser() user: Partial<User>) {
    const token = req.headers.authorization?.split(" ")[1]
    return { token, user, test: req?.user }
  }
}
