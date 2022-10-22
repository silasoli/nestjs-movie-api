import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { UploadCoverDto } from '../dto/upload-cover.dto';
import { Movie } from '../entities/movie.entity';
import { GenresService } from './genres.service';
import { join } from 'path';
import { IReturnFavorite } from '../interfaces/IReturnFavorite';
import { PaginationService } from '../../common/pagination.service';

@Injectable()
export class MoviesService {
  @Inject('MOVIES_REPOSITORY')
  private readonly movieRepository: Repository<Movie>;
  constructor(
    private readonly genresService: GenresService,
    private readonly paginationService: PaginationService,
  ) {}

  private async findByTitle(title: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { title } });
  }

  public async validCreate(dto: CreateMovieDto): Promise<void> {
    if (dto.title) {
      const movie = await this.findByTitle(dto.title);
      if (movie) throw new BadRequestException(`Title already registered`);
    }
  }

  public async create(dto: CreateMovieDto): Promise<Movie> {
    const genres = await Promise.all(
      dto.genres.map((name) => this.genresService.preloadGenreByName(name)),
    );

    await this.validCreate(dto);

    const movie = this.movieRepository.create({ ...dto, genres });

    return this.movieRepository.save(movie);
  }

  public async findAll(
    page: number,
    filters: object = {},
    sort: object = {},
  ): Promise<Movie[]> {
    return this.paginationService.findAllPagination(
      this.movieRepository,
      page,
      {
        relations: ['genres'],
        where: { ...filters },
        order: { ...sort },
      },
    );
  }

  public async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres'],
    });

    if (!movie) throw new NotFoundException(`movie ID ${id} not found`);

    return movie;
  }

  public async validUpdate(id: string, dto: UpdateMovieDto): Promise<void> {
    if (dto.title) {
      const movie = await this.findByTitle(dto.title);
      if (movie && movie.id != id)
        throw new BadRequestException(`Movie already registered`);
    }
  }

  public async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    await this.validUpdate(id, dto);

    const genres =
      dto.genres &&
      (await Promise.all(
        dto.genres.map((name) => this.genresService.preloadGenreByName(name)),
      ));

    const movie = await this.movieRepository.preload({
      id: id,
      ...dto,
      genres,
    });

    if (!movie) throw new NotFoundException(`Movie ID ${id} not found`);

    return this.movieRepository.save(movie);
  }

  public async remove(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) throw new NotFoundException(`Movie ID ${id} not found`);

    return this.movieRepository.remove(movie);
  }

  public async updateCover(id: string, dto: UploadCoverDto): Promise<Movie> {
    const movie = await this.movieRepository.preload({
      id: id,
      ...{ cover: dto.file },
    });

    if (!movie) throw new NotFoundException(`Movie ID ${id} not found`);

    return this.movieRepository.save(movie);
  }

  public async getCoverByMovie(id: string): Promise<string> {
    let cover = 'default-image.png';

    const movie = await this.findOne(id);

    if (movie.cover) cover = movie.cover;

    return join(process.cwd(), 'uploads/covers/' + cover);
  }

  public async favorite(id: string): Promise<IReturnFavorite> {
    const movie = await this.findOne(id);

    const dto = { favorite_quantity: movie.favorite_quantity + 1 };

    await this.movieRepository.update(id, {
      ...dto,
    });

    return {
      message: 'Favoritado com sucesso',
      favorite_quantity: dto.favorite_quantity,
    };
  }
}
