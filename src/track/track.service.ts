import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { ITrack } from './interfaces';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from './dto/updateTrack.dto';

@Injectable()
export class TrackService {
  private tracks: ITrack[] = [];

  findAll() {
    return this.tracks;
  }

  findById(id: string) {
    return this.tracks.find((track) => track.id === id);
  }

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack: ITrack = {
      id: uuidv4(),
      name,
      duration,
      artistId: artistId || null,
      albumId: albumId || null,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, { name, artistId, albumId, duration }: UpdateTrackDto) {
    const currentTrack = this.tracks.find((track) => track.id === id);

    if (currentTrack) {
      name ? (currentTrack.name = name) : false;
      name ? (currentTrack.artistId = artistId) : false;
      name ? (currentTrack.albumId = albumId) : false;
      name ? (currentTrack.duration = duration) : false;

      return currentTrack;
    } else {
      return null;
    }
  }

  delete(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      this.tracks = this.tracks.filter((track) => track.id !== id);
      return true;
    } else {
      return false;
    }
  }

  handleDeletedAlbumReference(id: string) {
    const tracks = this.tracks.filter((track) => track.albumId === id);
    tracks.forEach((track) => (track.albumId = null));
  }

  handleDeletedArtistReference(id: string) {
    const tracks = this.tracks.filter((track) => track.artistId === id);
    tracks.forEach((track) => (track.artistId = null));
  }
}
