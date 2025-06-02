import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto';
import { NotFoundError } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor( @InjectRepository(User) private userRepository: Repository<User>){}

async getUserById( id: number){
const user = await this.userRepository.findOne({
    where: {
        id
    }
});
if (!user) throw new NotFoundException('user not found')

    return { user };
}

async deleteUserById(id: number){
const result = await this.userRepository.delete({ id });

if (result.affected === 0 ) throw new NotAcceptableException("User you're finding doesn't exist");

return { message:"User already deleted"}

}

async editUserById(id: number, dto: UserDto){
    try {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) throw new NotFoundException("User you're trying to access does not exist");

        if(dto.email){
            user.email = dto.email;
        }
        if(dto.password){
            user.password = dto.password
        }

        await this.userRepository.save(user);

        return {
            message:"User updates successfully",
            user
        }

    } catch (error) {
        throw new InternalServerErrorException('Update failed');
    }
    
}  
}
