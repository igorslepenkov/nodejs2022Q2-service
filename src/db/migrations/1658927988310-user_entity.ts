import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEntity1658927988310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.user_entity
            (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                login character varying COLLATE pg_catalog."default" NOT NULL,
                password character varying COLLATE pg_catalog."default" NOT NULL,
                version integer NOT NULL,
                "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
                "updatedAt" timestamp without time zone NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY (id)
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.user_entity
                OWNER to root;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.user_entity
    `);
  }
}
