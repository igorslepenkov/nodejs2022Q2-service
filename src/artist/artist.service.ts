import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UpdateArtistDto } from './dto/updateArtist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  @InjectRepository(ArtistEntity)
  private artistRepository: Repository<ArtistEntity>;

  async findAllArtists() {
    const artists = await this.artistRepository.find();
    return artists;
  }

  async findArtistById(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (artist) {
      return artist;
    } else {
      return null;
    }
  }

  async create(artistDto: CreateArtistDto) {
    const createdArtist = this.artistRepository.create(artistDto);
    const savedArtist = await this.artistRepository.save(createdArtist);
    if (savedArtist) {
      return savedArtist.toResponse();
    } else {
      return null;
    }
  }

  async update(id: string, { name, grammy }: UpdateArtistDto) {
    const currentArtist = await this.artistRepository.findOne({
      where: { id },
    });
    if (currentArtist) {
      name ? (currentArtist.name = name) : false;
      grammy !== undefined ? (currentArtist.grammy = grammy) : false;
      return (await this.artistRepository.save(currentArtist)).toResponse();
    } else {
      return false;
    }
  }

  async delete(id: string) {
    const response = await this.artistRepository.delete(id);
    if (response.affected !== 0) {
      return true;
    } else {
      return false;
    }
  }
}
