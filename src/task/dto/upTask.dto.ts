import { TaskRole } from './task.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpTaskDto {
  @IsOptional()
  @IsString({
    message: 'Inform a valid description',
  })
  description: string;

  @IsOptional()
  @IsEnum(TaskRole)
  taskRole: TaskRole;
}
