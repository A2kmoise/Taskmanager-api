import { Body, Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { OtpService } from './otp.service';


@Controller('otp')
export class OtpController {
    constructor(private otpService: OtpService) { }

    @Get('generate')
    generateOtp() {
        const otp = this.otpService.generateOtp()
    }

    @Post('verify')
    verifyOtp(@Body() body: { otp: string }) {
        const isvalid = this.otpService.verifyOtp()
    }

}
