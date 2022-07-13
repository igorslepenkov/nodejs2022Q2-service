import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { FavsController } from './favs/favs.controller';
import { TrackService } from './track/track.service';
import { TrackModule } from './track/track.module';

@Module({
  imports: [TrackModule],
  controllers: [AppController, UserController, TrackController, ArtistController, AlbumController, FavsController],
  providers: [AppService, TrackService],
})
export class AppModule {}
