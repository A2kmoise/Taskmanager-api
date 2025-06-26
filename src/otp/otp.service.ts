import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class OtpService {
    private transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    private otpStore: Map<string, string> = new Map();

  
    generateOtp(length: number = 8): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let otp = '';
        for (let x = 0; x < length; x++) {  
            otp += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return otp;
    }

   
    async sendOtp(to: string): Promise<void> {
        const otp = this.generateOtp();
        this.otpStore.set(to, otp);

      
        const htmlContent = `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            color: #333;
                        }
                        .container {
                            background-color: #f4f4f4;
                            padding: 20px;
                            border-radius: 8px;
                            width: 80%;
                            max-width: 600px;
                            margin: 0 auto;
                        }
                        h2 {
                            color: #4CAF50;
                        }
                        .otp-box {
                            background-color: #fff;
                            border: 1px solid #ddd;
                            padding: 15px;
                            border-radius: 5px;
                            font-size: 24px;
                            font-weight: bold;
                            color: #333;
                            text-align: center;
                            margin: 20px 0;
                        }
                        p {
                            font-size: 16px;
                            color: #555;
                        }
                        .footer {
                            font-size: 14px;
                            color: #777;
                            text-align: center;
                            margin-top: 20px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Your One-Time Password (OTP) for Taskmanager</h2>
                        <p>Hello,</p>
                        <p>Your OTP for now is:</p>
                        <div class="otp-box">
                            ${otp}
                        </div>
                        <p>This OTP is valid for 10 minutes only. Please use it promptly to complete your action.</p>
                        <div class="footer">
                            <p>If you did not request this OTP, please ignore this email.</p>
                            <p>Best regards,</p>
                            <p>Taskmanager Team</p>
                        </div>
                    </div>
                </body>
            </html>
        `;

        
        const mailOptions = {
            from: process.env.USER,
            to,
            subject: 'Your OTP from Taskmanager',
            html: htmlContent, 
        };

        await this.transporter.sendMail(mailOptions);
    }

    verifyOtp(to: string, otp: string): boolean {
        const storedOtp = this.otpStore.get(to);
        if (!storedOtp) {
            return false;
        }

        if (storedOtp === otp) {
            this.otpStore.delete(to);  
            return true;
        }
        return false; 
    }
}
