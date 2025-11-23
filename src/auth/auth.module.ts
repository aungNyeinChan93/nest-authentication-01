/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './provider/jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthGuard } from './gurad/jwt-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, JwtAuthGuard],
  imports: [
    JwtModule.register({ global: true }),
    PassportModule,
    UsersModule,
    PrismaModule,
  ],
  exports: [
    AuthService, JwtStrategy, JwtService, JwtAuthGuard
  ]

})
export class AuthModule { }
