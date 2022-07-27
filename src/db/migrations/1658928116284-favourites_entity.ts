import { MigrationInterface, QueryRunner } from 'typeorm';

export class favouritesEntity1658928116284 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.favourites_entity
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                CONSTRAINT "PK_977676d7282891c15e1a579ee37" PRIMARY KEY (id)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.favourites_entity
                OWNER to root;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.favourites_entity
    `);
  }
}
