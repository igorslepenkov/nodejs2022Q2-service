import { Injectable } from '@nestjs/common';
import { AddToFavouritesDto } from './dto/addToFavourites.dto';
import { RemoveFromFavourites } from './dto/removeFromFavourites.dto';
import { IFavorites } from './interfaces';

@Injectable()
export class FavsService {
  private favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  get() {
    return this.favorites;
  }

  add({ type, id }: AddToFavouritesDto) {
    switch (type) {
      case 'album':
        this.favorites.albums.push(id);
        break;
      case 'artist':
        this.favorites.artists.push(id);
        break;
      case 'track':
        this.favorites.tracks.push(id);
        break;
    }
  }

  delete({ type, id }: RemoveFromFavourites) {
    switch (type) {
      case 'album':
        const album = this.favorites.albums.find((albumId) => albumId === id);
        if (album) {
          this.favorites.albums = this.favorites.albums.filter(
            (albumId) => albumId !== id,
          );
          return true;
        } else {
          return false;
        }

      case 'artist':
        const artist = this.favorites.artists.find(
          (artistId) => artistId === id,
        );
        if (artist) {
          this.favorites.artists = this.favorites.artists.filter(
            (artistsId) => artistsId !== id,
          );
          return true;
        } else {
          return false;
        }

      case 'track':
        const track = this.favorites.tracks.find((trackId) => trackId === id);
        if (track) {
          this.favorites.tracks = this.favorites.tracks.filter(
            (tracksId) => tracksId !== id,
          );
          return true;
        } else {
          return false;
        }
    }
  }
}
