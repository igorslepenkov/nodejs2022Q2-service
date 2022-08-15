import { MigrationInterface, QueryRunner } from 'typeorm';

export class artistEntity1658927812921 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.artist_entity
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                grammy boolean NOT NULL,
                CONSTRAINT "PK_c6ec16b57b60c8096406808021d" PRIMARY KEY (id)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.artist_entity
                OWNER to root;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.artist_entity
    `);
  }
}
