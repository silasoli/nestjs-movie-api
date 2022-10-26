import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class MovieQueryDto extends PaginationQueryDto {
  @ApiProperty({ required: false, description: 'String field to genre' })
  @IsOptional()
  genreId?: string;

  @ApiProperty({ required: false, example: 'YYYY-MM-DD' })
  @IsOptional()
  startPeriod?: string;

  @ApiProperty({ required: false, example: 'YYYY-MM-DD' })
  @IsOptional()
  endPeriod?: string;
}
