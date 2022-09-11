import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserCreateDto from './dto/user-create.dto';
import { MailService } from '../mail/mail.service';
import UserDto from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private mailService: MailService,
  ) {}

  @Post('/register')
  async register(@Body() userDto: UserCreateDto): Promise<any> {
    console.log(userDto);
    const user = await this.userService.create(userDto);
    return user;
  }

  @Post('/confirm')
  async confirm(@Body() userDto: UserDto) {
    return await this.mailService.sendUserConfirm(userDto);
  }
}
