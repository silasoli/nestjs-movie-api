import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PaginationService {
  public async findAllPagination(
    repository: Repository<any>,
    page = 0,
    query: object = {},
  ): Promise<any> {
    const pageSize = 10;

    const numberOfRecords = await repository.count(query);

    const numberOfPages = Math.ceil(numberOfRecords / pageSize);

    if (!page) {
      return repository.find(query);
    }

    return {
      numberOfPages,
      numberOfRecords,
      records: await repository.find({
        ...query,
        take: pageSize,
        skip: 10 * page - 10,
      }),
    };
  }
}
