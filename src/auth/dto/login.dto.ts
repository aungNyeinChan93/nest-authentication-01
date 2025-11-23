/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserLogin } from "../types/auth.types";



export class LoginDto implements UserLogin {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
