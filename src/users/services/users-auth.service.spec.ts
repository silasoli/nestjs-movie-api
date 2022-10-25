import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import * as crypto from 'crypto';
import { PaginationService } from '../../common/services/pagination.service';
import { AuthService } from '../../auth/services/auth.service';
import { UsersAuthService } from './users-auth.service';
import { SigninDto } from '../../auth/dto/signin.dto';

const user = {
  name: 'SilasOli',
  email: 'silasoliv39@gmail.com',
  password: '$2b$12$TRrHQvieLX72zAAY5LLjgeJx10n9C91UHF61R27J55Fg0uoUeNrwe',
};

describe('UsersAuthService', () => {
  let usersAuthService: UsersAuthService;
  let authService: AuthService;

  beforeEach(async () => {
    //@ts-expect-error defined part of methods
    usersAuthService = new UsersAuthService();
    //@ts-expect-error defined part of methods
    authService = new AuthService();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(usersAuthService).toBeDefined();
  });

  describe('Signin', () => {
    it('Should throw a Not Found Exception', async () => {
      const dto: SigninDto = {
        email: user.email,
        password: 'useradmin@1234',
      };
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersAuthService['userRepository'] = mockUserRepository;

      await expect(usersAuthService.signin(dto)).rejects.toThrowError(
        'Email not found.',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should throw a Invalid Credentials', async () => {
      const dto: SigninDto = {
        email: user.email,
        password: 'useradmin@1234',
      };
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      usersAuthService['userRepository'] = mockUserRepository;

      await expect(usersAuthService.signin(dto)).rejects.toThrowError(
        'Invalid credentials.',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should create a new jwt token successfully', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const dto: SigninDto = {
        email: user.email,
        password: 'useradmin@123',
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      usersAuthService['userRepository'] = mockUserRepository;

      const authService = {
        createAccessToken: jest.fn().mockResolvedValueOnce(id),
      };
      //@ts-expect-error defined part of methods
      usersAuthService['authService'] = authService;

      const result = await usersAuthService.signin(dto);

      expect(result).toEqual({
        name: 'SilasOli',
        jwtToken: id,
        email: 'silasoliv39@gmail.com',
      });

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Logout', () => {
    it('Must log out a user successfully', async () => {
      const authHeader = `Bearer ${crypto.randomBytes(14).toString('hex')}`;

      const authService = {
        deleteAccessToken: jest
          .fn()
          .mockResolvedValueOnce('Sessão encerrada com sucesso'),
      };
      //@ts-expect-error defined part of methods
      usersAuthService['authService'] = authService;

      const result = await usersAuthService.logout(authHeader);

      expect(result).toEqual('Sessão encerrada com sucesso');
    });
  });
});
