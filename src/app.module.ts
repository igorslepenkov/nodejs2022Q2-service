import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ArtistService } from './artist/artist.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsService } from './favs/favs.service';
import { FavsModule } from './favs/favs.module';
import { DBModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    TrackModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    DBModule,
    AuthModule,
  ],
  providers: [
    UserService,
    ArtistService,
    FavsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
