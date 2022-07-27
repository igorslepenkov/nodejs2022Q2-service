import { MigrationInterface, QueryRunner } from 'typeorm';

export class albumEntity1658927908793 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.album_entity
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                year integer NOT NULL,
                "artistId" character varying COLLATE pg_catalog."default",
                CONSTRAINT "PK_319a74c2085b42849b15412a3bf" PRIMARY KEY (id)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.album_entity
                OWNER to root;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.album_entity
    `);
  }
}
