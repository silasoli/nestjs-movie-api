import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { FiltersCreator } from '../../common/utils/filtersCreate.util';
import { IPaginateUser } from '../interfaces/IPaginateUser';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateUserDto): Promise<User> {
    try {
      await this.usersService.validCreate(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.usersService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(
    @Query() query: PaginationQueryDto,
  ): Promise<User[] | IPaginateUser> {
    const filter = FiltersCreator.filterByLikeField(query);

    const sort = FiltersCreator.sortByField(query);

    return this.usersService.findAll(query.page, { ...filter }, sort);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    try {
      await this.usersService.validUpdate(id, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }
}
