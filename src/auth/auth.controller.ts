import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
} from '@nestjs/common';
import { PermitDto } from './../user/dto/permit.dto';
import { CreateUserDto } from './../user/dto/user.dto';
import { User } from 'src/user/entity/user.entity';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserDto);
    return {
      message: 'Successfully registered',
    };
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) permitDto: PermitDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(permitDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  getMetadataArgsStorage(@GetUser() user: User): User {
    return user;
  }
}
