import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { MailService } from '../mail/mail.service';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private mailService: MailService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/register')
  async register(@Body() userDto: UserCreateDto): Promise<UserDto> {
    return new UserEntity(await this.userService.create(userDto));
  }

  @Post('/confirm')
  async confirm(@Body() userDto: UserDto) {
    return await this.mailService.sendUserConfirm(userDto);
  }
}
