import { Test, TestingModule } from '@nestjs/testing';
import { UsersAuthController } from './users-auth.controller';
import { UsersAuthService } from '../services/users-auth.service';

describe('UsersAuthController', () => {
  let controller: UsersAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAuthController],
      providers: [UsersAuthService],
    }).compile();

    controller = module.get<UsersAuthController>(UsersAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
