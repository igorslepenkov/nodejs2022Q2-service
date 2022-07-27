import { MigrationInterface, QueryRunner } from 'typeorm';

export class track1658915066991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.track_entity
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name character varying COLLATE pg_catalog."default" NOT NULL,
                "artistId" character varying COLLATE pg_catalog."default",
                "albumId" character varying COLLATE pg_catalog."default",
                duration integer NOT NULL,
                CONSTRAINT "PK_9cc0e8a743e689434dac0130098" PRIMARY KEY (id)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.track_entity
                OWNER to root;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE public.track_entity
    `);
  }
}
