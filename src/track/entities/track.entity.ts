import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ITrack } from '../interfaces';

@Entity()
export class TrackEntity implements ITrack {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  @Column({
    nullable: true,
  })
  albumId: string | null;

  @Column()
  duration: number;

  toResponse = () => {
    const { id, name, artistId, albumId, duration } = this;
    return {
      id,
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };
  };
}
