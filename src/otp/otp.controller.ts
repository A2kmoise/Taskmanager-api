import { Body, Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';


@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) { }

  @Get('generate')
  async sendOtp(@Body('email') email: string) {
    await this.otpService.sendOtp(email)
  }

  @Post('verify')
  verifyOtp(@Body('email') email: string, @Body('otp') otp: string): boolean {
    const isValid = this.otpService.verifyOtp(email, otp);
    return isValid;
  }
}

