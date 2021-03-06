import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "oleg18ua71@gmail.com",
        pass: "258120Oleg",
      },
    });
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: "oleg18ua71@gmail.com",
      to: to,
      subject: "Активация аккаунта на " + "http://localhost:8000",
      text: "",
      html: `
            <div>
            <h1>Thank you for registering!</h1>
            <h2>To activate, follow the link</h2>
            <a href="${link}">{link}</a>
            </div>
            `,
    });
  }

  async sendCode(to: string, code: string, name: string) {
    await this.transporter.sendMail({
      from: "oleg18ua71@gmail.com",
      to: to,
      subject: "Your digit code",
      text: "",
      html: `
            <div>
            <h1>Hello, ${name}</h1>
            <h2>Please use this code: ${code} to reset your password</h2>
            </div>
            `,
    });
  }
}
