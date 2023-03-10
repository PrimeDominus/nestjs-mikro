import { EntityRepository } from '@mikro-orm/postgresql';
import { Shop } from './shop.entity';

export class ShopRepository extends EntityRepository<Shop> {

}