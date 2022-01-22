import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: to,
            subject: 'Активация аккаунта на ' + 'http://localhost:5000',
            text: '',
            html: `
            <div>
            <h1>Thank you for registering!</h1>
            <h2>To activate, follow the link</h2>
            <a href="${link}">{link}</a>
            </div>
            `,
        });
    }
}
