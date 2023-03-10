import {
    Collection,
    Entity,
    EntityRepositoryType,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { User } from './User';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';

@Entity()
export class Shop extends BaseEntity {

    @Property()
    name!: string;

    @Property()
    description?: string;
    

    @OneToMany(() => Product, product => product.shop)
    products = new Collection<Product>(this);

    @ManyToOne()
    owner!: User;

    constructor(name: string, description: string, owner: User) {
        super()
        this.name = name;
        this.description = description;
        this.owner = owner;
    }

}

// interface ShopDTO extends EntityDTO<Shop> {
//     following?: boolean;
// }