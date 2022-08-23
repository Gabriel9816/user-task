import { Module } from '@nestjs/common';
import { DatabaseModule } from './../database.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
