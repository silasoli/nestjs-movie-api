import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MoviesModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    CommonModule,
  ],
})
export class AppModule {}
