import {
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FindOneParams } from 'src/track/dto/findOneParams.dto';
import { TrackService } from 'src/track/track.service';
import { FavsService } from './favs.service';
import { IFavorites, IFavoritesResponse } from './interfaces';

@Controller('favs')
export class FavsController {
  constructor(
    private favsService: FavsService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private artistService: ArtistService,
  ) {}

  resolveFilds({ tracks, albums, artists }: IFavorites): IFavoritesResponse {
    const response = {
      tracks: [],
      albums: [],
      artists: [],
    };

    if (tracks) {
      response.tracks = tracks.map((trackId) =>
        this.trackService.findById(trackId),
      );
    }

    if (albums) {
      response.albums = albums.map((albumId) =>
        this.albumService.findAlbumById(albumId),
      );
    }

    if (artists) {
      response.artists = artists.map((artistId) =>
        this.artistService.findArtistById(artistId),
      );
    }

    return response;
  }

  @Get()
  getAllFavs() {
    return this.resolveFilds(this.favsService.get());
  }

  @Post('track/:id')
  addTrackToFavourites(@Param() { id }: FindOneParams) {
    const track = this.trackService.findById(id);
    if (track) {
      this.favsService.add({ type: 'track', id });
      return 'Track has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Track with such id does not exist',
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFromFavourites(@Param() { id }: FindOneParams) {
    const response = this.favsService.delete({ type: 'track', id });
    if (!response) {
      throw new NotFoundException('This track is not in favourites');
    }
  }

  @Post('album/:id')
  addAlbumToFavourites(@Param() { id }: FindOneParams) {
    const album = this.albumService.findAlbumById(id);
    if (album) {
      this.favsService.add({ type: 'album', id });
      return 'Album has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Album with such id does not exist',
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFromFavourites(@Param() { id }: FindOneParams) {
    const response = this.favsService.delete({ type: 'album', id });
    if (!response) {
      throw new NotFoundException('This album is not in favourites');
    }
  }

  @Post('artist/:id')
  addArtistToFavourites(@Param() { id }: FindOneParams) {
    const artist = this.artistService.findArtistById(id);
    if (artist) {
      this.favsService.add({ type: 'artist', id });
      return 'Artist has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Artist with such id does not exist',
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFromFavourites(@Param() { id }: FindOneParams) {
    const response = this.favsService.delete({ type: 'artist', id });
    if (!response) {
      throw new NotFoundException('This artist is not in favourites');
    }
  }
}
