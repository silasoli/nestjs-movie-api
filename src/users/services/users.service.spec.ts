import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from './users.service';
import * as crypto from 'crypto';
import { PaginationService } from '../../common/services/pagination.service';

const user = {
  name: 'SilasOli',
  email: 'silasoliv39@gmail.com',
  password: 'silas@123',
};

describe('UsersService', () => {
  let usersService: UsersService;
  let paginateService: PaginationService;

  beforeEach(async () => {
    paginateService = new PaginationService();
    //@ts-expect-error defined part of methods
    usersService = new UsersService();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('Valid Create', () => {
    it('Should throw a single field exception', async () => {
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.validCreate(user)).rejects.toThrowError(
        'Email already registered',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should valid a create user successfully', async () => {
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.validCreate(user);

      expect(result).toEqual(undefined);

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Transform Dto', () => {
    it('Nothing should be done as the properties are null', async () => {
      const dto: CreateUserDto = {
        name: null,
        email: null,
        password: null,
      };

      const result = await usersService.transformDto(dto);

      expect(result).toEqual(undefined);
    });

    it('Must make changes in the email and password fields', async () => {
      const dto: CreateUserDto = {
        name: 'silasoli',
        email: 'SILASOLIV39@GMAIL.COM',
        password: 'silas@123',
      };

      const result = await usersService.transformDto(dto);

      const hasUpper = /[A-Z]/.test(dto.email);
      expect(hasUpper).toEqual(false);

      expect(dto.password).not.toEqual('silas@123');
      expect(typeof dto.password).toBe('string');

      expect(result).toEqual(undefined);
    });
  });

  describe('Create', () => {
    it('Should throw a single field exception', async () => {
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(user),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.validCreate(user)).rejects.toThrowError(
        'Email already registered',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should create a new user successfully', async () => {
      const userReturn = {
        id: crypto.randomBytes(14).toString('hex'),
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
        create: jest.fn().mockResolvedValueOnce(userReturn),
        save: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.create(user);

      expect(result).toEqual({
        id: expect.any(String),
        ...user,
        password: expect.any(String),
        created_at: expect.any(Date),
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find All', () => {
    it('Must fetch all without pagination', async () => {
      const mockUserRepository = {
        find: jest.fn().mockResolvedValueOnce([user]),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const paginationService = {
        findAllPagination: jest
          .fn()
          .mockResolvedValueOnce(mockUserRepository.find()),
      };
      //@ts-expect-error defined part of methods
      usersService['paginationService'] = paginationService;

      const result = await usersService.findAll(null);

      expect(result).toEqual([user]);

      expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Must fetch all with pagination', async () => {
      const paginationReturn = {
        qtyPages: 1,
        qtyRecords: [user].length,
        records: [user],
      };

      const mockUserRepository = {
        find: jest.fn().mockResolvedValueOnce([user]),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const paginationService = {
        findAllPagination: jest.fn().mockImplementationOnce(async (page) => {
          const registers = await mockUserRepository.find();
          return {
            qtyPages: 1,
            qtyRecords: [registers].length,
            records: registers,
          };
        }),
      };
      //@ts-expect-error defined part of methods
      usersService['paginationService'] = paginationService;

      const result = await usersService.findAll(null);

      expect(result).toEqual(paginationReturn);

      expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find One', () => {
    it('Should throw a Not Found Exception', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.findOne(id)).rejects.toThrowError(
        `User ID ${id} not found`,
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should find a user successfully', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const userReturn = {
        id,
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.findOne(id);

      expect(result).toEqual({
        id,
        ...user,
        created_at: expect.any(Date),
      });

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Valid Update', () => {
    it('Should throw a single field exception', async () => {
      const id = crypto.randomBytes(14).toString('hex');
      const userReturn = {
        id: crypto.randomBytes(14).toString('hex'),
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.validUpdate(id, user)).rejects.toThrowError(
        'Email already registered',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should valid a update a user successfully when not found', async () => {
      const id = crypto.randomBytes(14).toString('hex');
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.validUpdate(id, user);

      expect(result).toEqual(undefined);

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should valid a update a user successfully when found', async () => {
      const id = crypto.randomBytes(14).toString('hex');
      const userReturn = {
        id,
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.validUpdate(id, user);

      expect(result).toEqual(undefined);

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update', () => {
    it('Should throw a single field exception', async () => {
      const id = crypto.randomBytes(14).toString('hex');
      const userReturn = {
        id: crypto.randomBytes(14).toString('hex'),
        ...user,
        created_at: new Date(),
      };
      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.update(id, user)).rejects.toThrowError(
        'Email already registered',
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should throw a Not Found Exception', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
        preload: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.update(id, user)).rejects.toThrowError(
        `User ID ${id} not found`,
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.preload).toHaveBeenCalledTimes(1);
    });

    it('Should update a user successfully', async () => {
      const id = crypto.randomBytes(14).toString('hex');
      const userReturn = {
        id,
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
        preload: jest.fn().mockResolvedValueOnce(userReturn),
        save: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.update(id, user);

      expect(result).toEqual({
        id: id,
        ...user,
        password: expect.any(String),
        created_at: expect.any(Date),
      });
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.preload).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Remove', () => {
    it('Should throw a Not Found Exception', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(null),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      await expect(usersService.remove(id)).rejects.toThrowError(
        `User ID ${id} not found`,
      );

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('Should remove a user successfully', async () => {
      const id = crypto.randomBytes(14).toString('hex');

      const userReturn = {
        id,
        ...user,
        created_at: new Date(),
      };

      const mockUserRepository = {
        findOne: jest.fn().mockResolvedValueOnce(userReturn),
        remove: jest.fn().mockResolvedValueOnce(userReturn),
      };
      //@ts-expect-error defined part of methods
      usersService['userRepository'] = mockUserRepository;

      const result = await usersService.remove(id);

      expect(result).toEqual({
        id,
        ...user,
        created_at: expect.any(Date),
      });

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
