import { AlbumEntity } from 'src/album/entities/album.entity';
import { IAlbum } from 'src/album/interfaces';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { IArtist } from 'src/artist/interfaces';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IFavorites } from '../interfaces';

@Entity()
export class FavouritesEntity implements IFavorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ArtistEntity)
  @JoinTable()
  artists: IArtist[];

  @ManyToMany(() => AlbumEntity)
  @JoinTable()
  albums: IAlbum[];

  @ManyToMany(() => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];

  toResponse = () => {
    const { id, artists, albums, tracks } = this;
    return {
      id,
      artists,
      albums,
      tracks,
    };
  };
}
