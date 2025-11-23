/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { $Enums } from "@prisma/client";
import { User } from "../types/user-schema.types";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class CreateUserDto implements Omit<User, 'id'> {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEnum($Enums.UserRole)
    @IsOptional()
    role: $Enums.UserRole | null;

    @IsOptional()
    createdAt: Date;

    @IsOptional()
    updatedAt: Date;
}
