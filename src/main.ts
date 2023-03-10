import { MikroORM } from '@mikro-orm/core';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  


  //sync db schemas
  if (process.env.DB_SYNC == "true") {
    await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
    await app.get(MikroORM).getSchemaGenerator().updateSchema();
  }

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Api example')
    .setDescription('The nestjs API description')
    .setVersion('1.0')
    .addTag('nest-example')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  // await app.listen(process.env.API_PORT, process.env.API_URL);
  await app.listen(configService.get("API_PORT", "API_URL"), configService.get("API_URL"));
}
bootstrap();
