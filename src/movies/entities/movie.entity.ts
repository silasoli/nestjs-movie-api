import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Genre } from './genre.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  release_year: Date;

  @JoinTable({ name: 'movies_genres' })
  @ManyToMany(() => Genre, (genre: Genre) => genre.movies, {
    cascade: true,
  })
  genres: Genre[];

  @Column('decimal')
  imdb: number;

  @Column({ nullable: true })
  cover: string;

  @Column('int')
  favorite_quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}
