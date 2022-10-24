import 'dotenv/config';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { usersProviders } from '../users/providers/users.providers';
import { AuthService } from './services/auth.service';
import { blacklistProviders } from './blacklist/providers/blacklist.providers';
import { BlacklistService } from './blacklist/services/blacklist.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [
    ...usersProviders,
    ...blacklistProviders,
    AuthService,
    JwtStrategy,
    BlacklistService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
