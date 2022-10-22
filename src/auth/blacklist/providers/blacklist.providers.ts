import { DataSource } from 'typeorm';
import { Blacklist } from '../entities/blacklist.entity';

export const blacklistProviders = [
  {
    provide: 'BLACKLIST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Blacklist),
    inject: ['DATA_SOURCE'],
  },
];
