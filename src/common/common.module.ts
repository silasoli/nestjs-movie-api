import { Global, Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PaginationService } from './services/pagination.service';
import { SeedsService } from './services/seeds.service';

@Global()
@Module({
  imports: [UsersModule],
  providers: [PaginationService, SeedsService],
  exports: [PaginationService, SeedsService],
})
export class CommonModule {}
