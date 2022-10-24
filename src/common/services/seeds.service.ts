import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import 'dotenv/config';

@Injectable()
export class SeedsService {
  private logger = new Logger(SeedsService.name);

  constructor(private readonly usersService: UsersService) {}

  public async start(): Promise<void> {
    this.logger.log('Seeds successfully initialized');

    await this.addUserAdmin();

    this.logger.log('Seeds successfully finished');
  }

  private async addUserAdmin(): Promise<void> {
    const email = process.env.USER_EMAIL;
    const userExists = await this.usersService.findByEmail(email);

    if (userExists) return;

    this.logger.log(`Adicionando User Admin`);

    await this.usersService.create({
      name: 'UserAdmin',
      email,
      password: process.env.USER_PASSWORD,
    });
    this.logger.log(`User Admin adicionado`);
  }
}
