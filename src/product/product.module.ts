import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { Shop } from 'src/shop/shop.entity';
import { ShopModule } from 'src/shop/shop.module';
import { ProuductController } from './product.controller';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Module({
    controllers : [ProuductController],
    exports : [ProductService],
    imports : [
        MikroOrmModule.forFeature({entities:[Product,Shop]}),
        ShopModule
    ],
    providers : [ProductService]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        
    }
}