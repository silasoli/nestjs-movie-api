import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../auth/services/auth.service';
import { UsersAuthService } from './users-auth.service';

describe('UsersAuthService', () => {
  let service: UsersAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<UsersAuthService>(UsersAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
