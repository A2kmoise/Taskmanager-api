import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Subject } from 'rxjs';
import { text } from 'stream/consumers';

dotenv.config();

@Injectable()
export class OtpService {
    private transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
user: process.env.USER,
pass: process.env.PASS,
      }  
    });

    generateOtp(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let otp = '';
        for (let x = 0; x <= 8; x++) {
            otp += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return otp;
    }
  async sendOtp(to: string): Promise<void>{
    const otp = this.generateOtp;

    const mail = {
        form: process.env.USER,
        to,
        Subject: "One-time password from Taskmanager",
        text: `Your OTP for now is: ${otp}`,
    };
    await this.transporter.sendMail(mail);
}


    verifyOtp() {

    }
}