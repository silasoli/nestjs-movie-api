import { IPaginate } from '../../common/interfaces/IPaginate';
import { Movie } from '../entities/movie.entity';

export interface IPaginateMovie extends IPaginate {
  records: Movie[];
}
