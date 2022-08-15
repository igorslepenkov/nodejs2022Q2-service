import { IsUUID, Matches } from 'class-validator';

const regexp = /album|artist|track/;

export class RemoveFromFavourites {
  @Matches(regexp)
  type: 'album' | 'artist' | 'track';

  @IsUUID('4')
  id: string;
}
