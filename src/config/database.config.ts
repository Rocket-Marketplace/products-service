import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PRODUCTS_DB_HOST || 'products-db',
  port: parseInt(process.env.PRODUCTS_DB_PORT || '5432', 10),
  username: process.env.PRODUCTS_DB_USERNAME || 'postgres',
  password: process.env.PRODUCTS_DB_PASSWORD || 'postgres',
  database: process.env.PRODUCTS_DB_NAME || 'products_db',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  logging: process.env.NODE_ENV === 'development',
};
