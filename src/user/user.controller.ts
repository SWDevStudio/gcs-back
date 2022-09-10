import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import UserCreateDto from './dto/user-create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userDto: UserCreateDto): Promise<any> {
    console.log(userDto);
    const user = await this.userService.create(userDto);
    return user;
  }
}
