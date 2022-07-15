import { forwardRef, Module } from '@nestjs/common';
import { ArtistModule } from 'src/artist/artist.module';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
  imports: [
    forwardRef(() => FavsModule),
    ArtistModule,
    forwardRef(() => TrackModule),
  ],
})
export class AlbumModule {}
