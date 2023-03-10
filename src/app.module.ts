import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule, MikroOrmMiddleware } from '@mikro-orm/nestjs';
import { Module, NestModule, MiddlewareConsumer, OnModuleInit, RequestMethod } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
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
      isGlobal: true,
      cache: true
    }),

    MikroOrmModule.forRoot(),
    LoggerModule.forRoot(),
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
    JwtService,
  ],
})


export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) { }

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*'); // this middleware is for all check api auth
    consumer.apply(LoginMiddleware).exclude(
      // { path: 'V1/auth', method: RequestMethod.ALL },
      "V1/auth/(.*)",
      { path: 'V1/user', method: RequestMethod.POST }
    ).forRoutes('*')
  };
}
