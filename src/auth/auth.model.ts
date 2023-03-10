import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers : [AuthController],
    exports : [AuthService],
    imports : [
        MikroOrmModule.forFeature({entities:[User]})
    ],
    providers : [AuthService, JwtService]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        
    }
}