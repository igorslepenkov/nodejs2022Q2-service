import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { ITrack } from './types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TrackService {
  private readonly tracks: ITrack[] = [];

  findAll() {
    return this.tracks;
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack: ITrack = {
      _id: uuidv4(),
      name,
      duration,
    };
    artistId ? (newTrack.artistId = artistId) : false;
    albumId ? (newTrack.albumId = albumId) : false;

    this.tracks.push(newTrack);
    return newTrack;
  }
}
