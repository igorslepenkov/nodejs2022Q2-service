import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { IAlbum } from './interfaces';

@Injectable()
export class AlbumService {
  private albums: IAlbum[] = [];

  findAllAlbums() {
    return this.albums;
  }

  findAlbumById(id: string) {
    return this.albums.find((album) => album.id === id);
  }

  create({ name, year, artistId }: CreateAlbumDto): IAlbum {
    const newAlbum = {
      id: uuidv4(),
      name,
      year,
      artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      name ? (album.name = name) : false;
      year ? (album.year = year) : false;
      artistId ? (album.artistId = artistId) : false;
      return album;
    } else {
      return false;
    }
  }

  delete(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      this.albums = this.albums.filter((album) => album.id !== id);
      return true;
    } else {
      return false;
    }
  }

  handleDeletedArtistReference(id: string) {
    const albums = this.albums.filter((album) => album.artistId === id);
    albums.forEach((album) => (album.artistId = null));
  }
}
