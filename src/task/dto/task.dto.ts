import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ['Facil', 'Moderado', 'Dificil'] })
  situation: TaskRole;
}

export enum TaskRole {
  easy = 'Facil',
  moderate = 'Moderado',
  hard = 'Dificil',
}
