import { IArtist } from 'src/artist/interfaces';
import { ITrack } from 'src/track/interfaces';
import { IAlbum } from '../album/interfaces';

interface IFavorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export { IFavoritesResponse, IFavorites };
