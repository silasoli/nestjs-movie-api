import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './providers/users.providers';
import { UsersAuthController } from './controllers/users-auth.controller';
import { UsersAuthService } from './services/users-auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, UsersAuthController],
  providers: [UsersService, UsersAuthService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
