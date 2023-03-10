import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Permission } from './permission.entity';

@Module({
    controllers : [],
    exports : [],
    imports : [
        MikroOrmModule.forFeature({entities:[Permission]})
    ],
    providers : []
})
export class PermissionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        
    }
}