import { Between, Like, Not } from 'typeorm';
import { MovieQueryDto } from '../../movies/dto/movie-query.dto';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

export const FiltersCreator = {
  filterByFavoriteMovies(): object {
    const filter = { favorite_quantity: Not(0) };
    return filter;
  },
  filterByLikeField(dto: PaginationQueryDto | MovieQueryDto): object {
    const { fieldSearch, search } = dto;

    if (fieldSearch === 'genre') return this.filterByGenre(search);

    if (!fieldSearch || !search) return {};

    const filter = { [`${fieldSearch}`]: Like('%' + search + '%') };
    return filter;
  },
  filterByPeriod(dto: MovieQueryDto, field = 'created_at'): object {
    const { startPeriod, endPeriod } = dto;

    if (!startPeriod || !endPeriod) return {};

    const filter = {
      [`${field}`]: Between(
        new Date(`${startPeriod}${'T00:00:00.000Z'}`),
        new Date(`${endPeriod}${'T23:59:59.000Z'}`),
      ),
    };
    return filter;
  },
  filterByGenre(search: string): object {
    return {
      genres: {
        id: search,
      },
    };
  },
  sortByField(dto: PaginationQueryDto | MovieQueryDto): object {
    const { fieldSort, sort } = dto;

    if (!fieldSort || !sort) return { created_at: 'ASC' };

    const sortObj = { [`${fieldSort}`]: sort };
    return sortObj;
  },
};
