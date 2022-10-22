import { Controller, Get, Param, Patch } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { ApiTags } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { IReturnFavorite } from '../interfaces/IReturnFavorite';

@ApiTags('movies')
@Controller('movies')
export class GetMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  public async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id/favorite')
  public async favoriteById(@Param('id') id: string): Promise<IReturnFavorite> {
    return this.moviesService.favorite(id);
  }

  @Get('/favorites')
  public async findAllFavorites(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }
}
