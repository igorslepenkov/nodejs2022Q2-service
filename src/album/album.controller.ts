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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { FindOneParams } from './dto/findOneParams.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAllAlbums() {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  findAlbumById(@Param() { id }: FindOneParams) {
    const album = this.albumService.findAlbumById(id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Post()
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  updateAlbum(
    @Param() { id }: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: FindOneParams) {
    const response = this.albumService.delete(id);
    if (response) {
      return true;
    } else {
      throw new NotFoundException('Album not found');
    }
  }
}
