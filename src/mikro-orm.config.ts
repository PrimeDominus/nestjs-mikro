import { LoadStrategy } from "@mikro-orm/core";
import { MikroOrmModuleOptions as Options } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { ConfigService } from "@nestjs/config";
const configService = new ConfigService();

const config: Options = {
    entities: ['./dist/**/*.entity.js'],
    entitiesTs: ['./src/**/*.entity.ts'],
    baseDir: process.cwd(),
    type: configService.get("DB_TYPE"),
    dbName: configService.get("DB_NAME"),
    user: configService.get("DB_USER"),
    password: configService.get("DB_PASSWORD"),
    host: configService.get("DB_HOST"),
    port: parseInt(configService.get("DB_PORT")),
    metadataProvider: TsMorphMetadataProvider,
    debug: true,
    tsNode: false,
}
// as Options;
export default config;
