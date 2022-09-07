import UserDto from './user.dto';

export default interface UserCreateDto extends UserDto {
  password: string;
}
