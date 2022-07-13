import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { FindOneParams } from './dto/find-one.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackService } from './track.service';
import { ITrack } from './interfaces';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks(): ITrack[] {
    const tracks = this.trackService.findAll();
    return tracks;
  }

  @Get(':id')
  getTrack(@Param() { id }: FindOneParams): ITrack {
    const track = this.trackService.findById(id);
    if (track) {
      return track;
    } else {
      throw new NotFoundException();
    }
  }

  @Post()
  postNewTrack(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = this.trackService.create(createTrackDto);
    return newTrack;
  }

  @Put(':id')
  updateTrack(
    @Param() { id }: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = this.trackService.update(id, updateTrackDto);
    if (updatedTrack) {
      return updatedTrack;
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  deleteTrack(@Param() { id }: FindOneParams) {
    const deleteTrack = this.trackService.delete(id);
    if (deleteTrack) {
      return true;
    } else {
      throw new NotFoundException();
    }
  }
}
