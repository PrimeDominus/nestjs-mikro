import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { Module, NestModule, MiddlewareConsumer, OnModuleInit, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AuthMiddleware } from './middleware/auth.middleware'
import { TerminusModule } from '@nestjs/terminus';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.model';
import { UserModule } from './user/user.model';
import { LoginMiddleware } from './middleware/login.middleware';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.entity';
import { PermissionModule } from './permission/permission.model';
import { CaslModule } from './casl/casl.module';
import { NextFunction } from 'express';

@Module({
  imports: [
    ConfigModule.forRoot({
      // load: [configuration],
      isGlobal: true,
      cache: true
    }),

    MikroOrmModule.forRoot(
      // {
      //   // entities: ['./dist/*/*.entity.js'],
      //   // entitiesTs: ['./src/*/*.entity.ts'],
      //   autoLoadEntities: true,
      //   // optionally you can override the base directory (defaults to `process.cwd()`)
      //   baseDir: process.cwd(),
      //   type: 'postgresql',
      //   dbName: process.env.DB_NAME, //'mikroORMNest',
      //   user: process.env.DB_USER, //'root',
      //   password: process.env.DB_PASSWORD,// 'root',
      //   host: process.env.DB_HOST, //'localhost',
      //   port: parseInt(process.env.DB_PORT), // 5432,
      //   metadataProvider: TsMorphMetadataProvider,
      //   debug: true,
      //   tsNode: false,
      //   // cache: { enabled: false },
      //   registerRequestContext: true,
      //   // migrations: {
      //   //   path: 'dist/migrations',
      //   //   pathTs: 'src/migrations',
      //   // },
      //   loadStrategy: LoadStrategy.JOINED,
      // }
    ),
    LoggerModule.forRoot(),
    // ConfigModule.forRoot(),
    TerminusModule,
    ShopModule,
    ProductModule,
    AuthModule,
    UserModule,
    MikroOrmModule.forFeature({entities:[User]}),// used for middleware access
    PermissionModule, CaslModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    // CustomResponse,
    JwtService,// used middleware access
    // OsoInstance,
    // OsoGuard,
  ],
})


export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) { }

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // use(req: Request, res: Response, next: NextFunction) {
  //   RequestContext.create(this.orm.em, next);
  // }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware, AuthMiddleware).forRoutes('*'); // this middleware is for all check api auth
    consumer.apply(LoginMiddleware).exclude(
      // { path: 'V1/auth', method: RequestMethod.ALL },
      "V1/auth/(.*)",
      { path: 'V1/user', method: RequestMethod.POST }
    ).forRoutes('*')
  };
}
