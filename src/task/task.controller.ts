import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entity/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Get('find/:id')
  findOneMore(@Param('id') id: string): string {
    return `encontrei um outro task com id ${id}`;
  }

  @Post()
  createTask(@Body() task: Task): string {
    this.taskService.create(task);
    return 'A New Task was Created';
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.taskService.remove(id);
  }
}
