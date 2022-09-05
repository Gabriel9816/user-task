import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { PermitDto } from './../user/dto/permit.dto';
import { CreateUserDto } from './../user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from './../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password != createUserDto.confirmPass) {
      throw new UnprocessableEntityException("The passwords don't match");
    } else {
      return this.userRepository.create(createUserDto);
    }
  }

  async signIn(permitDto: PermitDto) {
    const user = await this.userService.checkCredential(permitDto);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const jwtPayload = {
      is: user.id,
    };
    const token = this.jwtService.sign(jwtPayload);
    return { token };
  }
}
