import { User } from 'src/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('task_table')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  description: string;

  @Column('enum')
  situation: TaskRole;
  @OneToOne(() => User, (user) => user.task) // specify inverse side as a second parameter
  user: User;
}
export enum TaskRole {
  easy = 'Facil',
  moderate = 'Moderado',
  hard = 'Dificil',
}
