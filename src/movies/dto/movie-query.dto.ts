import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class MovieQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'String field to genre' })
  genreId: string;

  @ApiProperty({ required: false, example: 'YYYY-MM-DD' })
  startPeriod?: string;

  @ApiProperty({ required: false, example: 'YYYY-MM-DD' })
  endPeriod?: string;
}
