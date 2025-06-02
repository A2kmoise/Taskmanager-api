import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class UserDto{
    @IsString()
    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsOptional()
    @MinLength(6)
    @IsNotEmpty()
    password:string

}