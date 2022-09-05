/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
import { Task } from 'src/task/entity/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_table')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  email: string;

  @Column({ length: 500 })
  password: string;

  @Column({ length: 500 })
  confirmPass: string;

  @Column({ length: 500 })
  status: boolean;

  @Column({ length: 500 })
  confirmationToken: string;

  @Column({ nullable: false })
  salt: string;

  @CreateDateColumn({ length: 500 })
  createAt: Date;

  @UpdateDateColumn({ length: 500 })
  update: Date;

  @OneToOne(() => Task, (Task) => Task.user)
  @JoinColumn()
  task: Task;


  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
