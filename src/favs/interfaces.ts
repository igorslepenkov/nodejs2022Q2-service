import { IArtist } from 'src/artist/interfaces';
import { ITrack } from 'src/track/interfaces';
import { IAlbum } from '../album/interfaces';

interface IFavorites {
  id: string;
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export { IFavoritesResponse, IFavorites };
