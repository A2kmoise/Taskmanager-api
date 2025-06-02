import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get('/:id')
    getUserById(@Param('id') id:string){
return this.userService.getUserById()
    }

    @Patch('/:id')
    editUserById(@Param('id') id: string){
return this.userService.editUserById()
    }

    @Delete('/:id')
    deleteUserById(@Param('id') id:string){
return this.userService.deleteUserById()
    }
}
