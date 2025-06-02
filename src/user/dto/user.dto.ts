import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password:string
}