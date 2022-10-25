import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateBlacklistDto } from '../dto/create-blacklist.dto';
import { Blacklist } from '../entities/blacklist.entity';

@Injectable()
export class BlacklistService {
  @Inject('BLACKLIST_REPOSITORY')
  private readonly blacklistRepository: Repository<Blacklist>;

  public async validCreate(dto: CreateBlacklistDto): Promise<Blacklist> {
    let blacklist = null;
    if (dto.jwt_token) {
      blacklist = await this.findOne(dto.jwt_token);
    }
    return blacklist;
  }

  public async create(dto: CreateBlacklistDto): Promise<Blacklist> {
    const blacklistExists = await this.validCreate(dto);

    if (blacklistExists) return blacklistExists;

    const blacklist = this.blacklistRepository.create(dto);

    return this.blacklistRepository.save(blacklist);
  }

  public async findOne(jwt_token: string): Promise<Blacklist> {
    const blacklist = await this.blacklistRepository.findOne({
      where: { jwt_token },
    });

    return blacklist;
  }
}
