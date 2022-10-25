import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SigninDto } from '../../auth/dto/signin.dto';
import { AuthService } from '../../auth/services/auth.service';
import { ISignin } from '../interfaces/ISignin';

@Injectable()
export class UsersAuthService {
  @Inject('USERS_REPOSITORY')
  private readonly userRepository: Repository<User>;
  constructor(private readonly authService: AuthService) {}

  public async signin(dto: SigninDto): Promise<ISignin> {
    const user = await this.findByEmail(dto.email);
    await this.checkPassword(dto.password, user);

    const jwtToken = await this.authService.createAccessToken(user.id);

    return { name: user.name, jwtToken, email: user.email };
  }

  public async logout(authHeader: string): Promise<string> {
    const token = authHeader.split(' ')[1];

    return this.authService.deleteAccessToken(token);
  }

  private async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new NotFoundException('Email not found.');

    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new NotFoundException('Invalid credentials.');

    return match;
  }
}
