import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PermitDto } from './dto/permit.dto';
import { CreateUserDto } from './dto/user.dto';
import { UpUserDto } from './dto/upUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    createUserDto.confirmToken = crypto.randomBytes(32).toString('hex');
    createUserDto.salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      createUserDto.salt,
    );
    createUserDto.status = false;
    try {
      await this.userRepository.save(createUserDto);
      delete createUserDto.password;
      delete createUserDto.salt;
      return createUserDto;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('This email address is already in use');
      } else {
        throw new InternalServerErrorException(
          'Error in saving the user in database',
        );
      }
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible to find all users');
    }
  }

  async findOneById(id: string): Promise<User> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.email'])
      .where('user.id = :id', { id: id })
      .getOne();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.email'])
      .where('user.email = :email', { email: email })
      .getOne();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, upUserDto: UpUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    const { name, email, status } = upUserDto;
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.status = status === undefined ? user.status : status;
    try {
      await this.userRepository.save(user);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the user in database',
      );
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Not found an user with the informed ID');
    }
  }

  async checkCredential(permitDto: PermitDto): Promise<User> {
    const { email, password } = permitDto;
    let user = new User();
    user = await this.userRepository.findOneBy({ email });
    if (user && (await user.checkPassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
