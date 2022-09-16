import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: true,
  })
  email: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
