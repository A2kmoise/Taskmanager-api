import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto';

@Controller('auth')
export class AuthController {
constructor(private authService: AuthService){}

    @Post('register')
 signup(@Body() dto:authDto){
return this.authService.signup()
 }

 @Post('login')
 login(@Body() dto:authDto ){
  return  this.authService.login()
 }

}
