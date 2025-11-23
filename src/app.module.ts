/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/gurad/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard
    // }
  ],
  imports: [PrismaModule, UsersModule, AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
})
export class AppModule { }
