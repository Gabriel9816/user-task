import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/task.dto';
import { UpTaskDto } from './dto/upTask.dto';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Get()
  showMessage(): string {
    return 'Here comes a Task';
  }

  @Get('/list')
  findAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('/:id')
  findOneTaskById(@Param('id') id: string): Promise<Task> {
    return this.taskService.findOneById(id);
  }

  @Get('/desc/:description')
  findOneTaskByDescription(
    @Param('description') description: string,
  ): Promise<Task> {
    return this.taskService.findOneByDescription(description);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() upTaskDto: UpTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, upTaskDto);
  }

  @Delete('/:id')
  async removeTask(@Param('id') id: string): Promise<string> {
    await this.taskService.remove(id);
    return 'The Task was successfully Removed';
  }
}
