import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// prettier-ignore
/* eslint-disable class-methods-use-this */
export default class AddAvatarFieldToUsers1604494671386
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
