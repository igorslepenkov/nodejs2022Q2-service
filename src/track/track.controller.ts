import { Controller, Get, Post } from '@nestjs/common';

const tracks = [];

@Controller('track')
export class TrackController {
  @Get()
  getTracks() {
    return tracks;
  }
  @Post()
  postNewTrack() {
    const newTrack = {
      _id: 'LOPATA',
      title: 'DVOROVAYA',
      duration: 10,
    };
    tracks.push(newTrack);
    return newTrack;
  }
}
