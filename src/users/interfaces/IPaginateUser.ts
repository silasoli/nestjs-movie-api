import { IPaginate } from '../../common/interfaces/IPaginate';
import { User } from '../entities/user.entity';

export interface IPaginateUser extends IPaginate {
  records: User[];
}
