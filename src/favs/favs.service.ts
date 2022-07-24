import { Injectable } from '@nestjs/common';
import { AddToFavouritesDto } from './dto/addToFavourites.dto';
import { RemoveFromFavourites } from './dto/removeFromFavourites.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouritesEntity } from './entities/favs.entity';
import { Repository } from 'typeorm';
import { IFavorites } from './interfaces';

@Injectable()
export class FavsService {
  @InjectRepository(FavouritesEntity)
  private favsRepository: Repository<FavouritesEntity>;
  private currentFav: FavouritesEntity = null;

  async get() {
    if (this.currentFav) {
      const favourites = await this.favsRepository.findOne({
        where: { id: this.currentFav.id },
        relations: {
          artists: true,
          albums: true,
          tracks: true,
        },
      });
      return favourites.toResponse();
    } else {
      const favourites = this.favsRepository.create({
        tracks: [],
        albums: [],
        artists: [],
      });
      this.currentFav = await this.favsRepository.save(favourites);
      return this.currentFav.toResponse();
    }
  }

  async add({ type, track, album, artist }: AddToFavouritesDto) {
    const favourites = await this.get();

    switch (type) {
      case 'album':
        favourites.albums.push(album);
        await this.favsRepository.save(favourites);
        break;
      case 'artist':
        favourites.artists.push(artist);
        await this.favsRepository.save(favourites);
        break;
      case 'track':
        favourites.tracks.push(track);
        await this.favsRepository.save(favourites);
        break;
    }
  }

  async delete({ type, id }: RemoveFromFavourites) {
    const favourites = await this.get();

    switch (type) {
      case 'album':
        const album = favourites.albums.find((album) => album.id === id);
        if (album) {
          favourites.albums = favourites.albums.filter(
            (album) => album.id !== id,
          );
          await this.favsRepository.save(favourites);
          return true;
        } else {
          return false;
        }

      case 'artist':
        const artist = favourites.artists.find((artist) => artist.id === id);
        if (artist) {
          favourites.artists = favourites.artists.filter(
            (artist) => artist.id !== id,
          );
          await this.favsRepository.save(favourites);
          return true;
        } else {
          return false;
        }

      case 'track':
        const track = favourites.tracks.find((track) => track.id === id);
        if (track) {
          favourites.tracks = favourites.tracks.filter(
            (track) => track.id !== id,
          );
          await this.favsRepository.save(favourites);
          return true;
        } else {
          return false;
        }
    }
  }
}
