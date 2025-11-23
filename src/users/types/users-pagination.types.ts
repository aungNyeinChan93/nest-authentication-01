/* eslint-disable prettier/prettier */
import { $Enums } from '@prisma/client';

export type UserQuery = {
    page: string | number;
    limit: string | number;
    name: string | number;
    role: $Enums.UserRole;
    skip?: string | number
};


export type Userpagination<T> = {
    currentPage: number;
    totalPage: number;
    limit: number;
    skip: number;
    items: T[]
    totalItem: number
}
