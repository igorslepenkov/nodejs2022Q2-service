import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TrackModule, UserModule],
  providers: [UserService],
})
export class AppModule {}
