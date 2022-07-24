import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistModule } from 'src/artist/artist.module';
import { FavsModule } from 'src/favs/favs.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entities/album.entity';

@Module({
  providers: [AlbumService],
  controllers: [AlbumController],
  imports: [
    forwardRef(() => FavsModule),
    ArtistModule,
    forwardRef(() => TrackModule),
    TypeOrmModule.forFeature([AlbumEntity]),
  ],
  exports: [AlbumService, TypeOrmModule],
})
export class AlbumModule {}
