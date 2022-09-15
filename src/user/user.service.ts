import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private UserRepository: Repository<UserEntity>,
    private MailService: MailService,
  ) {}

  async create(user: UserCreateDto): Promise<UserDto> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const userData = await this.UserRepository.save(user);
    await this.MailService.sendUserConfirm(userData);
    return userData;
  }
}
