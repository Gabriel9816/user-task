import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './entity/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  create(task: Task): void {
    this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(taskId: string): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id: taskId,
      },
    });
  }

  async remove(id: string) {
    return await this.taskRepository.delete(id);
  }

  async update(id: string, task: Task): Promise<Task> {
    this.taskRepository.update(
      {
        id: id,
      },
      {
        name: task.name,
      },
    );
    return this.findOne(id);
  }
}
