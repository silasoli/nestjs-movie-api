import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenresService {
  @Inject('GENRES_REPOSITORY')
  private readonly genreRepository: Repository<Genre>;

  public async preloadGenreByName(name: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne({ where: { name } });

    if (genre) {
      return genre;
    }

    return this.genreRepository.create({ name });
  }
}
