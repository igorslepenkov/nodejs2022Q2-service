import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from 'src/album/album.module';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
    TypeOrmModule.forFeature([ArtistEntity]),
  ],
  exports: [ArtistService, TypeOrmModule],
})
export class ArtistModule {}
