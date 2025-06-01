import { Body, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException, } from '@nestjs/common';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { catchError } from 'rxjs';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor( @InjectRepository(User)
     private userRepository: Repository<User>,
     private jwt: JwtService,
     private config: ConfigService
 ){}

    async signup(dto: AuthDto){
try {
    const extinguishuser = await this.userRepository.findOne(
        {
            where: { email : dto.email }
        });
   if (extinguishuser) { throw new ConflictException('Username already taken');}

   const hashSalt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(dto.password, hashSalt);

        const user = await this.userRepository.create({
            email: dto.email,
            password: hashedPassword
        });
        await this.userRepository.save(user);
       const token = await this.signToken(user.id, user.email);

       return{
        message: "User registered successfully",
        user:{
            id: user.id,
            email: user.email
        },
        access_token: token
       }

} catch (error) {
    throw new InternalServerErrorException('Registration failed');
}
}

async login(dto:AuthDto){
    try{
 const user = await this.userRepository.findOne({
    where:{
        email: dto.email
    }
 })
 if(user){
    const pwcheck = await bcrypt.compare(dto.password, user.password);
    if(pwcheck){
        const token = await this.signToken(user.id, user.email);
        return {
            message: "Login successful",
            user: {
                id:user.id,
                email:user.email
            },
            access_token: token
        }
    } throw new UnauthorizedException('Invalid credentials')
 }throw new UnauthorizedException('User not registered')
 }catch(error){
    console.error(error)
    return new InternalServerErrorException('Login failed');
 }
}

    async signToken(userId: number, email: String,): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const Secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '30m',
      secret: Secret,
    });
    return {
      access_token: token,
    };
  }
}

