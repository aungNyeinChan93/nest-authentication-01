/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/types/user-schema.types";



export class RegisterDto implements Pick<User, "name" | "email" | "password"> {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}