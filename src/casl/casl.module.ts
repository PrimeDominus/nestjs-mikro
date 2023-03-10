import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Roles } from 'src/app.roles';
import { Shop } from 'src/shop/shop.entity';
import { CaslAbilityFactory } from './casl-ability.factory';

@Module({
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
    imports: [
      MikroOrmModule.forFeature({entities:[Shop]})
    ]
  })
export class CaslModule {}
