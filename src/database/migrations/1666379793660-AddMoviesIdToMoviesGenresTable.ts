import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddMoviesIdToMoviesGenresTable1666379793660
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies_genres',
      new TableColumn({
        name: 'moviesId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'movies_genres',
      new TableForeignKey({
        name: 'movies_genres_movies',
        columnNames: ['moviesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movies_genres', 'movies_genres_movies');

    await queryRunner.dropColumn('movies_genres', 'moviesId');
  }
}
