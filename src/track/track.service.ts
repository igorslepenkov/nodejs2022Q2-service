import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  @InjectRepository(TrackEntity)
  private trackRepository: Repository<TrackEntity>;

  async create(trackDto: CreateTrackDto) {
    const createdTrack = this.trackRepository.create(trackDto);
    const savedTrack = await this.trackRepository.save(createdTrack);
    if (savedTrack) {
      return savedTrack.toResponse();
    } else {
      return null;
    }
  }

  async findAll() {
    const tracks = await this.trackRepository.find();
    return tracks;
  }

  async findById(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (track) {
      return track;
    } else {
      return null;
    }
  }

  async update(
    id: string,
    { name, artistId, albumId, duration }: UpdateTrackDto,
  ) {
    const currentTrack = await this.trackRepository.findOne({ where: { id } });

    if (currentTrack) {
      name ? (currentTrack.name = name) : false;
      duration ? (currentTrack.duration = duration) : false;
      artistId || artistId === null
        ? (currentTrack.artistId = artistId)
        : false;
      albumId || albumId === null ? (currentTrack.albumId = albumId) : false;

      const updatedTrack = await this.trackRepository.save(currentTrack);

      return updatedTrack.toResponse();
    } else {
      return null;
    }
  }

  async delete(id: string) {
    const response = await this.trackRepository.delete(id);
    if (response.affected !== 0) {
      return true;
    } else {
      return false;
    }
  }

  async handleDeletedRef(type: 'artist' | 'album', id: string) {
    try {
      const tracks = await this.findAll();
      const tracksWithRef = tracks.filter((tracks) => {
        if (type === 'album') {
          return tracks.albumId === id;
        } else {
          return tracks.artistId === id;
        }
      });

      const updates: UpdateTrackDto = {};

      type === 'artist' ? (updates.artistId = null) : false;
      type === 'album' ? (updates.albumId = null) : false;

      await Promise.all(
        tracksWithRef.map(async (track) => {
          return await this.update(track.id, updates);
        }),
      );
    } catch (err) {}
  }
}
