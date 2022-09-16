import { UserDto } from './user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto extends UserDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
