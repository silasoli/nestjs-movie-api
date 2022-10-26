import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { ApiTags } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { IReturnFavorite } from '../interfaces/IReturnFavorite';
import { FiltersCreator } from '../../common/utils/filtersCreate.util';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { MovieQueryDto } from '../dto/movie-query.dto';
import { IPaginateMovie } from '../interfaces/IPaginateMovie';

@ApiTags('movies')
@Controller('movies')
export class GetMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() query: MovieQueryDto,
  ): Promise<Movie[] | IPaginateMovie> {
    const filter = FiltersCreator.filterByLikeField(query);

    const filterByGenre = FiltersCreator.filterByGenre(query);

    const filterByPeriod = FiltersCreator.filterByPeriod(query, 'release_year');

    const sort = FiltersCreator.sortByField(query);

    return this.moviesService.findAll(
      query.page,
      { ...filterByGenre, ...filter, ...filterByPeriod },
      sort,
    );
  }

  @Get('/favorites')
  @HttpCode(HttpStatus.OK)
  public async findAllFavorites(
    @Query() query: PaginationQueryDto,
  ): Promise<Movie[] | IPaginateMovie> {
    const filter = FiltersCreator.filterByFavoriteMovies();

    const filterLike = FiltersCreator.filterByLikeField(query);

    const sort = FiltersCreator.sortByField(query);

    return this.moviesService.findAll(
      query.page,
      { ...filter, ...filterLike },
      sort,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id/favorite')
  @HttpCode(HttpStatus.OK)
  public async favoriteById(@Param('id') id: string): Promise<IReturnFavorite> {
    return this.moviesService.favorite(id);
  }
}
