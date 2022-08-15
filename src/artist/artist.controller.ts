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
import { Public } from 'src/meta/public';
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
  async findAllArtists() {
    return (await this.artistService.findAllArtists()).map((artist) =>
      artist.toResponse(),
    );
  }

  @Get(':id')
  async findArtistById(@Param() { id }: FindOneParams) {
    const artist = await this.artistService.findArtistById(id);
    if (artist) {
      return artist.toResponse();
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Post()
  async createArtist(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async updateArtist(
    @Param() { id }: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = await this.artistService.update(id, updateArtistDto);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: FindOneParams) {
    const response = await this.artistService.delete(id);
    if (response) {
      await this.trackService.handleDeletedRef('artist', id);
      await this.albumService.handleDeletedArtistReference(id);
      await this.favsService.delete({ type: 'artist', id });
      return true;
    } else {
      throw new NotFoundException('Artist not found');
    }
  }
}
