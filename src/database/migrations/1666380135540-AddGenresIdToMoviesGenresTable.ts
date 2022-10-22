import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddGenresIdToMoviesGenresTable1666380135540
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movies_genres',
      new TableColumn({
        name: 'genresId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'movies_genres',
      new TableForeignKey({
        name: 'movies_genres_genres',
        columnNames: ['genresId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'genres',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('movies_genres', 'movies_genres_genres');

    await queryRunner.dropColumn('movies_genres', 'genresId');
  }
}
