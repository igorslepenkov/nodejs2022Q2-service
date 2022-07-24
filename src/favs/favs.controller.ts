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
import { IAlbum } from 'src/album/interfaces';
import { ArtistService } from 'src/artist/artist.service';
import { IArtist } from 'src/artist/interfaces';
import { FindOneParams } from './dto/findOneParams.dto';
import { ITrack } from 'src/track/interfaces';
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

  @Get()
  async getAllFavs() {
    return await this.favsService.get();
  }

  @Post('track/:id')
  async addTrackToFavourites(@Param() { id }: FindOneParams) {
    const track = await this.trackService.findById(id);
    if (track) {
      await this.favsService.add({ type: 'track', track });
      return 'Track has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Track with such id does not exist',
      );
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeTrackFromFavourites(@Param() { id }: FindOneParams) {
    const response = await this.favsService.delete({ type: 'track', id });
    if (!response) {
      throw new NotFoundException('This track is not in favourites');
    }
  }

  @Post('album/:id')
  async addAlbumToFavourites(@Param() { id }: FindOneParams) {
    const album = await this.albumService.findAlbumById(id);
    if (album) {
      await this.favsService.add({ type: 'album', album });
      return 'Album has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Album with such id does not exist',
      );
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeAlbumFromFavourites(@Param() { id }: FindOneParams) {
    const response = await this.favsService.delete({ type: 'album', id });
    if (!response) {
      throw new NotFoundException('This album is not in favourites');
    }
  }

  @Post('artist/:id')
  async addArtistToFavourites(@Param() { id }: FindOneParams) {
    const artist = await this.artistService.findArtistById(id);
    if (artist) {
      await this.favsService.add({ type: 'artist', artist });
      return 'Artist has been successfuly added to favourites';
    } else {
      throw new UnprocessableEntityException(
        'Artist with such id does not exist',
      );
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeArtistFromFavourites(@Param() { id }: FindOneParams) {
    const response = await this.favsService.delete({ type: 'artist', id });
    if (!response) {
      throw new NotFoundException('This artist is not in favourites');
    }
  }
}
