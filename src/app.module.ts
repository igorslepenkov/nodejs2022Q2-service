import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsService } from './favs/favs.service';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [TrackModule, UserModule, ArtistModule, AlbumModule, FavsModule],
  providers: [UserService, ArtistService, FavsService],
})
export class AppModule {}
