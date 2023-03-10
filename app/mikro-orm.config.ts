import { Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

const options: Options = {
  entities: ['./dist/entities/*.js'],
  entitiesTs: ['./dist/entities/*.js'],
  baseDir: process.cwd(),
  type: "postgresql",
  dbName: "mikroORMNest",
  user: "root",
  password: "root",
  host: "localhost",
  port: 5432,
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
  tsNode: false,
  seeder: {
    path: './dist/seeder',
    pathTs: './app/seeder',
  },
};

export default options;
