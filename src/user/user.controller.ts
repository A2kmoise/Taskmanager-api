import { Controller, Delete, Get, Param, Patch, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { User } from './user.entity';
import { GetUser } from 'src/auth/decorator';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get('me')
    getMe(@GetUser() user:User){
     return user;
    }

    @Get(':id')
    getUserById(@Param('id') id:number){
return this.userService.getUserById(id)
    }

    @Patch(':id')
    editUserById(@Param('id') id:number, @Body() dto:UserDto){
return this.userService.editUserById(id, dto)
    }

    @Delete(':id')
    deleteUserById(@Param('id') id:number){
return this.userService.deleteUserById(id)
    }
}
