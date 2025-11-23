/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from '../types/auth.types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        private userService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.LOGIN_SECRET!,
        });
    }

    async validate(payload: TokenPayload) {
        try {
            const user = await this.userService.findOne(payload?.id)
            if (!user) throw new NotFoundException('user is not found');
            const { password, ...result } = user;
            return result;

        } catch (error) {
            console.error(error)
            throw new UnauthorizedException('Token is invalid')
        }
    }
}
