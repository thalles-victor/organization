import 'dotenv/config';
import { UserEntity } from '#entities';
import { ENV } from '#env';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres', // ou o banco de dados que você está usando
  host: ENV.POSTGRES_HOST,
  port: ENV.POSTGRES_PORT,
  username: ENV.POSTGRES_USER,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
  /** you can use automatic import if you prefer
    entities: ['../path/to/folder/*.entity{.ts,*js}'],
  */
  entities: [UserEntity],

  /** you can use automatic import if you prefer
    migrations: ['../path/to/folder/{.ts,*js}'],
  */
  migrations: [
    './src/Application/Infra/Repositories/TypeOrm/migrations/**/*.ts',
  ],

  synchronize: false,
  logging: true,
});
