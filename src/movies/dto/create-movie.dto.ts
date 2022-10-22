import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o título do filme.' })
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({
    message: 'É necessário informar a data de lançamento do filme.',
  })
  release_year: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty({
    message: 'É necessário informar ao menos um gênero data para o filme.',
  })
  genres: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty({
    message: 'É necessário informar a média do IMDB.',
  })
  imdb: number;
}
