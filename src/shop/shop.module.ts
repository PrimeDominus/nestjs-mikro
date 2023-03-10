import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.model';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Module({
    controllers : [ShopController],
    exports : [],
    imports : [
        MikroOrmModule.forFeature({entities:[Shop]}),
        UserModule,
    ],
    providers : [
        ShopService,
    ],
})
export class ShopModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    }
}