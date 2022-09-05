import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_table')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  description: string;

  @Column('enum')
  situation: TaskRole;
}
export enum TaskRole {
  easy = 'Facil',
  moderate = 'Moderado',
  hard = 'Dificil',
}
