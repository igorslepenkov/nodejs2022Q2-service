import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { User } from './user';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [TrackModule, UserModule],
  providers: [User, UserService],
})
export class AppModule {}
