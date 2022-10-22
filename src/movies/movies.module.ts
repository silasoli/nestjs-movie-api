import { Module } from '@nestjs/common';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { moviesProviders } from './providers/movies.providers';
import { GenresService } from './services/genres.service';
import { GetMoviesController } from './controllers/get-movies.controller';
import { PaginationService } from '../common/pagination.service';

@Module({
  controllers: [MoviesController, GetMoviesController],
  providers: [
    MoviesService,
    ...moviesProviders,
    GenresService,
    PaginationService,
  ],
})
export class MoviesModule {}
