import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { RequestMosque } from './src/request-mosque/entities/request-mosque.entity';
import { config } from 'dotenv';

// Load env vars from .env
config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, RequestMosque],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
});
