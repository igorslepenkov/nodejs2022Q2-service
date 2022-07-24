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
import { ArtistService } from 'src/artist/artist.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { FindOneParams } from './dto/findOneParams.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
    private favsService: FavsService,
  ) {}

  @Get()
  async findAllAlbums() {
    return (await this.albumService.findAllAlbums()).map((album) =>
      album.toResponse(),
    );
  }

  @Get(':id')
  async findAlbumById(@Param() { id }: FindOneParams) {
    const album = await this.albumService.findAlbumById(id);
    if (album) {
      return album.toResponse();
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async updateAlbum(
    @Param() { id }: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumService.update(id, updateAlbumDto);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: FindOneParams) {
    const response = await this.albumService.delete(id);
    if (response) {
      try {
        await this.favsService.delete({ type: 'album', id });
        await this.trackService.handleDeletedRef('album', id);
      } catch (err) {}
      return true;
    } else {
      throw new NotFoundException('Album not found');
    }
  }
}
