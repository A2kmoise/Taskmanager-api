import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    signup(){
return 'User signed up'
    }

    login(){
return 'User logged in'
    }
}

