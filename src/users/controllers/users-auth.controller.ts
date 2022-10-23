import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SigninDto } from '../../auth/dto/signin.dto';
import { UsersAuthService } from '../services/users-auth.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ISignin } from '../interfaces/ISignin';

@ApiTags('auth')
@Controller('auth')
export class UsersAuthController {
  constructor(private readonly usersAuthService: UsersAuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  public async signin(@Body() dto: SigninDto): Promise<ISignin> {
    return this.usersAuthService.signin(dto);
  }

  @Delete('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public async logout(@Req() request: Request): Promise<string> {
    const authHeader = request.headers.authorization;

    return this.usersAuthService.logout(authHeader);
  }
}
