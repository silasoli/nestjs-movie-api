import { DataSource } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { Movie } from '../entities/movie.entity';

export const moviesProviders = [
  {
    provide: 'MOVIES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Movie),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'GENRES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
    inject: ['DATA_SOURCE'],
  },
];
