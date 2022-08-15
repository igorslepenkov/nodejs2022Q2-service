import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/createAlbum.dto';
import { UpdateAlbumDto } from './dto/updateAlbum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  @InjectRepository(AlbumEntity)
  private albumRepository: Repository<AlbumEntity>;

  async findAllAlbums() {
    const albums = await this.albumRepository.find();
    return albums;
  }

  async findAlbumById(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      return album;
    } else {
      return null;
    }
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = this.albumRepository.create(createAlbumDto);
    const savedAlbum = await this.albumRepository.save(createdAlbum);

    if (savedAlbum) {
      return savedAlbum.toResponse();
    } else {
      return null;
    }
  }

  async update(id: string, { name, year, artistId }: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (album) {
      name ? (album.name = name) : false;
      year ? (album.year = year) : false;
      artistId ? (album.artistId = artistId) : false;
      return (await this.albumRepository.save(album)).toResponse();
    } else {
      return false;
    }
  }

  async delete(id: string) {
    const response = await this.albumRepository.delete(id);
    if (response.affected !== 0) {
      return true;
    } else {
      return false;
    }
  }

  async handleDeletedArtistReference(id: string) {
    try {
      const albumsWithRef = (await this.findAllAlbums()).filter(
        (album) => album.artistId === id,
      );
      albumsWithRef.forEach(
        async (album) => await this.update(album.id, { artistId: null }),
      );
    } catch (err) {}
  }
}
