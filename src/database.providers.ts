import { Task } from './task/entity/task.entity';
import { User } from './user/entity/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'NEST001DATASOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'dbmysql',
        port: 3306,
        username: 'root',
        password: 'admin',
        database: 'todolist',
        entities: [Task, User],

        synchronize: true,
        logging: true,
      });

      return dataSource.initialize();
    },
  },
];
