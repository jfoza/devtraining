import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDbStructure1721946858929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA public VERSION '1.1';
      COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';

      CREATE EXTENSION IF NOT EXISTS pgcrypto;
      CREATE EXTENSION IF NOT EXISTS unaccent;
      CREATE EXTENSION IF NOT EXISTS hstore;

      ALTER DATABASE postgres SET timezone TO 'Brazil/East';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
