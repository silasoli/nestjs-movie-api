import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import e from 'express';
import { Strategy } from 'passport-jwt';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { BlacklistService } from '../blacklist/services/blacklist.service';
import { JwtPayload } from '../interfaces/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly blacklistService: BlacklistService,
  ) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: e.Request, dto: JwtPayload): Promise<User> {
    const jwt_token = req.headers['authorization'].split(' ')[1];
    const user = await this.authService.validateUser(dto);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const blacklist = await this.blacklistService.findOne(jwt_token);

    if (blacklist) throw new UnauthorizedException(`Invalid token`);

    return user;
  }
}
