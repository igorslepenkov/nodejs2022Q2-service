import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces';

@Entity()
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  toResponse = () => {
    const { id, login, version, createdAt, updatedAt } = this;
    return {
      id,
      login,
      version,
      createdAt: new Date(createdAt).getTime(),
      updatedAt: new Date(updatedAt).getTime(),
    };
  };
}
