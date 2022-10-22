import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ required: false, description: 'Page to return' })
  page: number;

  @ApiProperty({
    required: false,
    description: 'Field to search',
  })
  fieldSearch: string;

  @ApiProperty({ required: false, description: 'String field to search' })
  search: string;

  @ApiProperty({
    required: false,
    description: 'Field by which the records will be sorted',
  })
  fieldSort: string;

  @ApiProperty({
    required: false,
    description: 'Field that indicates the ordering',
    enum: ['ASC', 'DESC'],
  })
  sort: string;
}
