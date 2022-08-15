import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

const { POSTGRES_USER, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_PORT } =
  process.env;

export const dbOptions: DataSourceOptions = {
  type: 'postgres',
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: ['./dist/**/entities/*.entity.js'],
  synchronize: false,
  migrations: ['./dist/db/migrations/*.js'],
  migrationsRun: true,
};
