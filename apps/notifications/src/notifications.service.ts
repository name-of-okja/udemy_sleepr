import { Injectable } from '@nestjs/common';
import { NotifiyEmailDto } from './dto/notifiy-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}
  // prod
  // private readonly transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAUTH2',
  //     user: this.configService.get('SMTP_USER'),
  //     clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //     clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //     refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
  //   },
  // });

  // Test
  private readonly transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: this.configService.get('SMTP_USER'),
      pass: this.configService.get('SMTP_PASS'),
    },
  });
  async notifiyEmial({ email, text }: NotifiyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: email,
      subject: '[Test]Sleepr Notification',
      text,
    });
  }
}
