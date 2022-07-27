import { MigrationInterface, QueryRunner } from 'typeorm';

export class favouritesEntityAlbumsAlbumEntity1658928188131
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.favourites_entity_albums_album_entity
            (
                "favouritesEntityId" uuid NOT NULL,
                "albumEntityId" uuid NOT NULL,
                CONSTRAINT "PK_865a65a2f0183153a7f05146883" PRIMARY KEY ("favouritesEntityId", "albumEntityId"),
                CONSTRAINT "FK_cf8e9385478ba02a266d0933660" FOREIGN KEY ("albumEntityId")
                    REFERENCES public.album_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT "FK_fe5ed44e7fd493630884c66f132" FOREIGN KEY ("favouritesEntityId")
                    REFERENCES public.favourites_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.favourites_entity_albums_album_entity
                OWNER to root;
            -- Index: IDX_cf8e9385478ba02a266d093366
            
            -- DROP INDEX IF EXISTS public."IDX_cf8e9385478ba02a266d093366";
            
            CREATE INDEX IF NOT EXISTS "IDX_cf8e9385478ba02a266d093366"
                ON public.favourites_entity_albums_album_entity USING btree
                ("albumEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_fe5ed44e7fd493630884c66f13
            
            -- DROP INDEX IF EXISTS public."IDX_fe5ed44e7fd493630884c66f13";
            
            CREATE INDEX IF NOT EXISTS "IDX_fe5ed44e7fd493630884c66f13"
                ON public.favourites_entity_albums_album_entity USING btree
                ("favouritesEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS public.favourites_entity_albums_album_entity
        `);
  }
}
