import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtist.dto';
import { FindOneParams } from './dto/findOneParams.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Controller('artist')
export class ArtistController {
  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
    private albumService: AlbumService,
    private favsService: FavsService,
  ) {}

  @Get()
  findAllArtists() {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  findArtistById(@Param() { id }: FindOneParams) {
    const artist = this.artistService.findArtistById(id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post()
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  updateArtist(
    @Param() { id }: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: FindOneParams) {
    const response = this.artistService.delete(id);
    if (response) {
      try {
        this.favsService.delete({ type: 'artist', id });
        this.albumService.handleDeletedArtistReference(id);
        this.trackService.handleDeletedArtistReference(id);
      } catch (err) {}
      return true;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }
}
