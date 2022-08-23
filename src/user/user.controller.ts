import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('find/:id')
  findOneMore(@Param('id') id: string): string {
    return `encontrei um outro user com id ${id}`;
  }

  @Post()
  createUser(@Body() user: User): string {
    this.userService.create(user);
    return 'A New User was Created';
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.userService.remove(id);
  }
}
