import { MigrationInterface, QueryRunner } from 'typeorm';

export class favouritesEntityTracksTrackEntity1658928326258
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.favourites_entity_tracks_track_entity
            (
                "favouritesEntityId" uuid NOT NULL,
                "trackEntityId" uuid NOT NULL,
                CONSTRAINT "PK_659993eaf2755548be301c5568b" PRIMARY KEY ("favouritesEntityId", "trackEntityId"),
                CONSTRAINT "FK_32461c5163d6b558d8aa825d64f" FOREIGN KEY ("trackEntityId")
                    REFERENCES public.track_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT "FK_c6fc042f8a81507099f09ef3423" FOREIGN KEY ("favouritesEntityId")
                    REFERENCES public.favourites_entity (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            )
            
            TABLESPACE pg_default;
            
            ALTER TABLE IF EXISTS public.favourites_entity_tracks_track_entity
                OWNER to root;
            -- Index: IDX_32461c5163d6b558d8aa825d64
            
            -- DROP INDEX IF EXISTS public."IDX_32461c5163d6b558d8aa825d64";
            
            CREATE INDEX IF NOT EXISTS "IDX_32461c5163d6b558d8aa825d64"
                ON public.favourites_entity_tracks_track_entity USING btree
                ("trackEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
            -- Index: IDX_c6fc042f8a81507099f09ef342
            
            -- DROP INDEX IF EXISTS public."IDX_c6fc042f8a81507099f09ef342";
            
            CREATE INDEX IF NOT EXISTS "IDX_c6fc042f8a81507099f09ef342"
                ON public.favourites_entity_tracks_track_entity USING btree
                ("favouritesEntityId" ASC NULLS LAST)
                TABLESPACE pg_default;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.favourites_entity_tracks_track_entity
    `);
  }
}
