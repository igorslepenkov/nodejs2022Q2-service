import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/createTrack.dto';
import { FindOneParams } from './dto/findOneParams.dto';
import { UpdateTrackDto } from './dto/updateTrack.dto';
import { TrackService } from './track.service';
import { ITrack } from './interfaces';
import { FavsService } from 'src/favs/favs.service';

@Controller('track')
export class TrackController {
  constructor(
    private trackService: TrackService,
    private favsService: FavsService,
  ) {}

  @Get()
  async getTracks() {
    const tracks = await this.trackService.findAll();
    return tracks.map((track) => track.toResponse());
  }

  @Get(':id')
  async getTrack(@Param() { id }: FindOneParams) {
    const track = await this.trackService.findById(id);
    if (track) {
      return track.toResponse();
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  async postNewTrack(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Put(':id')
  async updateTrack(
    @Param() { id }: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const updatedTrack = await this.trackService.update(id, updateTrackDto);
    if (updatedTrack) {
      return updatedTrack;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: FindOneParams) {
    const response = await this.trackService.delete(id);
    if (response) {
      try {
        await this.favsService.delete({ type: 'track', id });
      } catch (err) {}
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
