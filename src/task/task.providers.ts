import { Task } from './entity/task.entity';
import { DataSource } from 'typeorm';

export const taskProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['NEST001DATASOURCE'],
  },
];
