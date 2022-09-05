import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpTaskDto } from './dto/upTask.dto';
import { CreateTaskDto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task, TaskRole } from './entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      createTaskDto.situation = TaskRole.easy;
      await this.taskRepository.save(createTaskDto);
      delete createTaskDto.id;
      return createTaskDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the user in database',
      );
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Impossible to find all users');
    }
  }

  async findOneById(id: string): Promise<Task> {
    const task = this.taskRepository
      .createQueryBuilder('task')
      .select(['task.description', 'task.taskRole'])
      .where('task.id = :id', { id: id })
      .getOne();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async findOneByDescription(description: string): Promise<Task> {
    const task = this.taskRepository
      .createQueryBuilder('task')
      .select(['task.description', 'task.taskRole'])
      .where('task.description = :description', { description: description })
      .getOne();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, upTaskDto: UpTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    const { description, taskRole } = upTaskDto;
    task.description = description ? description : task.description;
    task.situation = taskRole ? taskRole : task.situation;
    try {
      await this.taskRepository.save(task);
      return this.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error in saving the task in database',
      );
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Not found a task with the informed ID');
    }
  }
}
