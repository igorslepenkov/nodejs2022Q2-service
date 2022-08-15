import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbOptions } from 'src/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions)],
  exports: [TypeOrmModule],
})
export class DBModule {}
