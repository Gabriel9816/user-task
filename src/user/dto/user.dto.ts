import { Task } from 'src/task/entity/task.entity';

export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  status: boolean;
  confirmPass: string;
  confirmToken: string;
  salt: string;
  createat: Date;
  update: Date;
  task: Task;
}
