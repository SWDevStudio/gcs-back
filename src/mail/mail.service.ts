import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendUserConfirm(user: UserDto) {
    return this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to GCS',
      template: './confirmation',
      context: {
        name: user.name,
        url: 'google.com',
      },
    });
  }
}
