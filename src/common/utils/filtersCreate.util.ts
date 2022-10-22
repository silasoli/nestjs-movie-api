import { Like, Not } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

export const FiltersCreator = {
  filterByFavoriteMovies(): object {
    const filter = { favorite_quantity: Not(0) };
    return filter;
  },
  filterByLikeField(dto: PaginationQueryDto): object {
    const { fieldSearch, search } = dto;

    if (!fieldSearch || !search) return {};

    const filter = { [`${fieldSearch}`]: Like('%' + search + '%') };
    return filter;
  },
  sortByField(dto: PaginationQueryDto): object {
    const { fieldSort, sort } = dto;

    if (!fieldSort || !sort) return { created_at: 'ASC' };

    const sortObj = { [`${fieldSort}`]: sort };
    return sortObj;
  },
};
