import {
    Collection,
    Entity,
    EntityRepositoryType,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { User } from 'src/user/user.entity';
import { Product } from '../product/product.entity';
import { ShopRepository } from './shop.repository';

@Entity({ customRepository: () => ShopRepository })
export class Shop {

    [EntityRepositoryType]?: ShopRepository;

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    description?: string;

    @Property()
    createdAt = new Date();

    @Property({
        onUpdate: () => new Date()
    })
    updatedAt = new Date();

    @OneToMany(() => Product, product => product.shop)
    products = new Collection<Product>(this);

    @ManyToOne()
    owner!: User;

    constructor(name: string, description: string, owner: User) {
        this.name = name;
        this.description = description;
        this.owner = owner;
    }

}

// interface ShopDTO extends EntityDTO<Shop> {
//     following?: boolean;
// }