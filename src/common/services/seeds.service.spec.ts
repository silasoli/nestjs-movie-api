import { UsersService } from '../../users/services/users.service';
import { SeedsService } from './seeds.service';

const user = {
  name: 'SilasOli',
  email: 'silasoliv39@gmail.com',
  password: '$2b$12$TRrHQvieLX72zAAY5LLjgeJx10n9C91UHF61R27J55Fg0uoUeNrwe',
};

describe('SeedsService', () => {
  let seedsService: SeedsService;
  let usersService: UsersService;

  beforeEach(async () => {
    //@ts-expect-error defined part of methods
    seedsService = new SeedsService();
    //@ts-expect-error defined part of methods
    usersService = new UsersService();
  });

  it('should be defined', () => {
    expect(seedsService).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('Start', () => {
    it('Must start seed and create super user successfully', async () => {
      const usersService = {
        findByEmail: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      seedsService['usersService'] = usersService;

      const result = await seedsService.start();

      expect(result).toEqual(undefined);
    });

    it('Must start seed and without create super user successfully', async () => {
      const usersService = {
        findByEmail: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      seedsService['usersService'] = usersService;

      const result = await seedsService.start();

      expect(result).toEqual(undefined);
    });
  });
});
