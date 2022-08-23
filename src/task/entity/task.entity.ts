import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('enum')
  situation: TaskRole;
}
export enum TaskRole {
  easy = 'Facil',
  moderate = 'Moderado',
  hard = 'Dificil',
}
