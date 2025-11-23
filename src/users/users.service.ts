/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUser, User, type CreateUser } from './types/user-schema.types';
import { Userpagination, type UserQuery } from './types/users-pagination.types';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) { };

  // create user
  async create(createUserDto: CreateUser) {
    const isUser = !!(await this.prisma.user.findUnique({ where: { email: createUserDto?.email } }));
    if (isUser) throw new HttpException('Email is already used!', HttpStatus.BAD_REQUEST);
    const user = await this.prisma.user.create({
      data: { ...createUserDto }
    })
    return user;
  }

  // get all users
  async findAll(userQuery: Partial<UserQuery>) {
    const totalUserCount = await this.prisma.user.count();
    const totalPage = Math.max(1, Math.ceil(totalUserCount / Number(userQuery?.limit)))

    const users = await this.prisma.user.findMany({
      where: {
        AND:
          [
            { role: userQuery?.role || undefined },
            { name: userQuery?.name as string || undefined }
          ]
      },
      take: userQuery?.limit as number,
      skip: userQuery?.skip as number,
      orderBy: { createdAt: 'desc' },
    }) as User[];

    return {
      currentPage: userQuery?.page,
      limit: userQuery?.limit,
      skip: userQuery?.skip,
      totalItem: totalUserCount,
      totalPage,
      items: users
    } as Userpagination<User>;
  }

  // get user
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) throw new HttpException('User is not Found!', HttpStatus.NOT_FOUND)
    return user;
  }

  async update(id: string, updateUserDto: UpdateUser) {
    const user = await this.findOne(id);
    const updateUser = await this.prisma.user.update({
      where: { id: user?.id },
      data: { ...updateUserDto }
    })
    return { updateUser }
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    await this.prisma.user.delete({ where: { id: user?.id } })
    return true
  }
}
