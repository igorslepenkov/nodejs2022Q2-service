import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IArtist } from '../interfaces';

@Entity()
export class ArtistEntity implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  toResponse = () => {
    const { id, name, grammy } = this;
    return {
      id,
      name,
      grammy,
    };
  };
}
