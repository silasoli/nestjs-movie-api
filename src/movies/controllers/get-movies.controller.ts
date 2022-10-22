import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import { ApiTags } from '@nestjs/swagger';
import { Movie } from '../entities/movie.entity';
import { IReturnFavorite } from '../interfaces/IReturnFavorite';
import { FiltersCreator } from '../../common/utils/filtersCreate.util';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@ApiTags('movies')
@Controller('movies')
export class GetMoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  public async findAll(@Query() query: PaginationQueryDto): Promise<Movie[]> {
    const filter = FiltersCreator.filterByLikeField(query);

    const sort = FiltersCreator.sortByField(query);

    return this.moviesService.findAll(query.page, filter, sort);
  }

  @Get('/favorites')
  public async findAllFavorites(
    @Query() query: PaginationQueryDto,
  ): Promise<Movie[]> {
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
  public async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Patch(':id/favorite')
  public async favoriteById(@Param('id') id: string): Promise<IReturnFavorite> {
    return this.moviesService.favorite(id);
  }
}
