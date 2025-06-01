import { IsEmail, IsString } from "class-validator";

export class authDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}