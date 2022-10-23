import { DataSource } from 'typeorm';
import { CreateUserTable1666230248840 } from './migrations/1666230248840-CreateUserTable';
import { CreateBlacklistTable1666375956789 } from './migrations/1666375956789-CreateBlacklistTable';
import { CreateMoviesTable1666378722064 } from './migrations/1666378722064-CreateMoviesTable';
import { CreateGenresTable1666379536043 } from './migrations/1666379536043-CreateGenresTable';
import { AddMoviesIdToMoviesGenresTable1666379793660 } from './migrations/1666379793660-AddMoviesIdToMoviesGenresTable';
import { AddGenresIdToMoviesGenresTable1666380135540 } from './migrations/1666380135540-AddGenresIdToMoviesGenresTable';
import { CreateMoviesGenresTable1666379536044 } from './migrations/1666379536044-CreateMoviesGenresTable';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DB,
  port: Number(process.env.PORT_DB),
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE,
  synchronize: false,
  entities: [__dirname + '/../**/*.entity.js'],
  migrations: [
    CreateUserTable1666230248840,
    CreateBlacklistTable1666375956789,
    CreateMoviesTable1666378722064,
    CreateGenresTable1666379536043,
    CreateMoviesGenresTable1666379536044,
    AddMoviesIdToMoviesGenresTable1666379793660,
    AddGenresIdToMoviesGenresTable1666380135540,
  ],
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = connectionSource;
      return dataSource.initialize();
    },
  },
];
