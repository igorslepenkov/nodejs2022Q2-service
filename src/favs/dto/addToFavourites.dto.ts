import { Matches } from 'class-validator';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

const regexp = /album|artist|track/;

export class AddToFavouritesDto {
  @Matches(regexp)
  type: 'album' | 'artist' | 'track';

  track?: TrackEntity;

  album?: AlbumEntity;

  artist?: ArtistEntity;
}
