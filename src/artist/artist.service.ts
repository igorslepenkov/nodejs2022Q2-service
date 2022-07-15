import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/createArtist.dto';
import { IArtist } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from './dto/updateArtist.dto';

@Injectable()
export class ArtistService {
  private artists: IArtist[] = [];

  findAllArtists() {
    return this.artists;
  }

  findArtistById(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create({ name, grammy }: CreateArtistDto) {
    const newArtist: IArtist = {
      id: uuidv4(),
      name,
      grammy: grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, { name, grammy }: UpdateArtistDto) {
    const currentArtist = this.artists.find((artist) => artist.id === id);
    if (currentArtist) {
      name ? (currentArtist.name = name) : (currentArtist.grammy = false);
      grammy ? (currentArtist.grammy = grammy) : (currentArtist.grammy = false);
      return currentArtist;
    } else {
      return false;
    }
  }

  delete(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      this.artists = this.artists.filter((artist) => artist.id !== id);
      return true;
    } else {
      return false;
    }
  }
}
