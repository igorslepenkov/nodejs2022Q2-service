import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsModule } from 'src/favs/favs.module';
import { TrackEntity } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    forwardRef(() => FavsModule),
    TypeOrmModule.forFeature([TrackEntity]),
  ],
  exports: [TrackService, TypeOrmModule],
})
export class TrackModule {}
