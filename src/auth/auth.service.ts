/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './types/auth.types';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private userService: UsersService,
        private prisma: PrismaService
    ) { };

    public async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, await bcrypt.genSalt(10))
    };

    public async verifyPassword(palinStr: string, hashStr: string): Promise<boolean> {
        return await bcrypt.compare(palinStr, hashStr)
    };

    public generateToken(payload: TokenPayload) {
        const token = this.jwt.sign(payload, {
            secret: process?.env.LOGIN_SECRET as string,
            expiresIn: '7d'
        })
        return token;
    }

    public verifyToken(token: string): TokenPayload {
        return this.jwt.verify(token) as TokenPayload
    }

    public async register(registerDto: RegisterDto) {
        const isUser = await this.prisma.user.findFirst({ where: { email: registerDto?.email } });
        if (isUser) throw new ConflictException('email is already used');
        const hashPassword = await this.hashPassword(registerDto?.password)
        const newUser = await this.prisma.user.create({
            data: { ...registerDto, password: hashPassword }
        })
        const token = this.generateToken({ email: newUser?.email, id: newUser?.id })
        if (!token) throw new ConflictException('fail token')
        return { newUser, token }
    }


    public async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findFirst({ where: { email: loginDto?.email } })
        if (!user) throw new ConflictException('email is not correct!');
    };



}
