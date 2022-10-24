import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import 'dotenv/config';
import { decode, sign } from 'jsonwebtoken';
import { User } from '../../users/entities/user.entity';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.model';
import { Repository } from 'typeorm';
import { CreateBlacklistDto } from '../blacklist/dto/create-blacklist';
import { BlacklistService } from '../blacklist/services/blacklist.service';

@Injectable()
export class AuthService {
  @Inject('USERS_REPOSITORY')
  private readonly userRepository: Repository<User>;
  constructor(private readonly blacklistService: BlacklistService) {}

  public async createAccessToken(userId: string): Promise<string> {
    return sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async deleteAccessToken(jwt: string): Promise<string> {
    const payload = decode(jwt);
    const user = await this.validateUser(payload['userId']);

    const dto: CreateBlacklistDto = { user_id: user.id, jwt_token: jwt };

    const blacklist = await this.blacklistService.create(dto);

    if (!blacklist) throw new UnauthorizedException('Failed to log out');
    else return 'Sessão encerrada com sucesso';
  }

  public async validateUser(jwtPayload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: jwtPayload.userId },
    });

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }

  private jwtExtractor(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new BadRequestException('Bad request.');

    const token = authHeader.split(' ')[1];

    return token;
  }

  public returnJwtExtractor(): (request: Request) => string {
    return this.jwtExtractor;
  }
}
