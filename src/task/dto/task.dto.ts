import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class TaskDto{

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

}