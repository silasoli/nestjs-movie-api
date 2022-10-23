import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../services/movies.service';
import { GetMoviesController } from './get-movies.controller';

describe('GetMoviesController', () => {
  let controller: GetMoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetMoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<GetMoviesController>(GetMoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
