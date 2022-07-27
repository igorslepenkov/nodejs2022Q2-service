import { MigrationInterface, QueryRunner } from 'typeorm';

export class favouritesEntityArtistsArtistEntity1658928254050
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.favourites_entity_artists_artist_entity
            (
                "favouritesEntityId" uuid NOT NULL,
                "artistEntityId" uuid NOT NULL,
                CONSTRAINT "PK_53425bad76132a27da2c069e788" PRIMARY KEY ("favouritesEntityId", "artistEntityId"),
                CONSTRAINT "FK_45b91ffc4bc1d6cd0eaab288ef7" FOREIGN KEY ("artistEntityId")
                    REFERENCES public.artist_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT "FK_df65cff8e1caaae423dcce7845a" FOREIGN KEY ("favouritesEntityId")
                    REFERENCES public.favourites_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.favourites_entity_artists_artist_entity
                OWNER to root;
            -- Index: IDX_45b91ffc4bc1d6cd0eaab288ef
            
            -- DROP INDEX IF EXISTS public."IDX_45b91ffc4bc1d6cd0eaab288ef";
            
            CREATE INDEX IF NOT EXISTS "IDX_45b91ffc4bc1d6cd0eaab288ef"
                ON public.favourites_entity_artists_artist_entity USING btree
                ("artistEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_df65cff8e1caaae423dcce7845
            
            -- DROP INDEX IF EXISTS public."IDX_df65cff8e1caaae423dcce7845";
            
            CREATE INDEX IF NOT EXISTS "IDX_df65cff8e1caaae423dcce7845"
                ON public.favourites_entity_artists_artist_entity USING btree
                ("favouritesEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.favourites_entity_artists_artist_entity
        `);
  }
}
