import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
}
