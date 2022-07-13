import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';
import { ITrack } from './types';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks(): ITrack[] {
    const tracks = this.trackService.findAll();
    return tracks;
  }

  @Post()
  postNewTrack(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = this.trackService.create(createTrackDto);
    return newTrack;
  }
}
