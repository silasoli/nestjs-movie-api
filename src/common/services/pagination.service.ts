import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IPaginate } from '../interfaces/IPaginate';

@Injectable()
export class PaginationService {
  public async findAllPagination(
    repository: Repository<any>,
    page = 0,
    query: object = {},
  ): Promise<any[] | IPaginate> {
    const pageSize = 10;

    const qtyRecords = await repository.count(query);

    const qtyPages = Math.ceil(qtyRecords / pageSize);

    if (!page) {
      return repository.find(query);
    }

    return {
      qtyRecords,
      qtyPages,
      records: await repository.find({
        ...query,
        take: pageSize,
        skip: 10 * page - 10,
      }),
    };
  }
}
