import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { PaginationService } from '../../common/services/pagination.service';
import { IPaginateUser } from '../interfaces/IPaginateUser';

@Injectable()
export class UsersService {
  @Inject('USERS_REPOSITORY')
  private readonly userRepository: Repository<User>;
  constructor(private readonly paginationService: PaginationService) {}

  public async validCreate(dto: CreateUserDto): Promise<void> {
    if (dto.email) {
      const user = await this.findByEmail(dto.email.toLowerCase());
      if (user) throw new BadRequestException(`Email already registered`);
    }
  }

  public async transformDto(dto: CreateUserDto | UpdateUserDto): Promise<void> {
    if (dto.email) dto.email = dto.email.toLowerCase();

    if (dto.password) dto.password = await bcrypt.hash(dto.password, 12);
  }

  public async create(dto: CreateUserDto): Promise<User> {
    await this.validCreate(dto);

    await this.transformDto(dto);

    const user = this.userRepository.create(dto);

    return this.userRepository.save(user);
  }

  public async findAll(
    page: number,
    filters: object = {},
    sort: object = {},
  ): Promise<User[] | IPaginateUser> {
    return this.paginationService.findAllPagination(this.userRepository, page, {
      where: { ...filters },
      order: { ...sort },
    });
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User ID ${id} not found`);

    return user;
  }

  public async validUpdate(id: string, dto: UpdateUserDto): Promise<void> {
    if (dto.email) {
      const user = await this.findByEmail(dto.email.toLowerCase());
      if (user && user.id != id)
        throw new BadRequestException(`Email already registered`);
    }
  }

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.validUpdate(id, dto);

    await this.transformDto(dto);

    const user = await this.userRepository.preload({
      id: id,
      ...dto,
    });

    if (!user) throw new NotFoundException(`User ID ${id} not found`);

    return this.userRepository.save(user);
  }

  public async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException(`User ID ${id} not found`);

    return this.userRepository.remove(user);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
