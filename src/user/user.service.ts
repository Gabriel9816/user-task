import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User): void {
    this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }

  async update(id: string, user: User): Promise<User> {
    this.userRepository.update(
      {
        id: id,
      },
      {
        name: user.name,
        email: user.email,
        password: user.password,
        confirmPass: user.confirmPass,
        createat: user.createat,
        update: user.update,
      },
    );
    return this.findOne(id);
  }
  async hashPassword(user) {
    const password = user.password;
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }
}
