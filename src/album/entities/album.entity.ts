import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IAlbum } from '../interfaces';

@Entity()
export class AlbumEntity implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({
    nullable: true,
  })
  artistId: string | null;

  toResponse = () => {
    const { id, name, year, artistId } = this;
    return {
      id,
      name,
      year,
      artistId,
    };
  };
}
