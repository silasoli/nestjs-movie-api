import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() dto: CreateUserDto) {
    try {
      await this.usersService.validCreate(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.usersService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  public async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    try {
      await this.usersService.validUpdate(id, dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
