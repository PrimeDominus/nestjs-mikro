import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { User } from 'src/user/user.entity';
import { Shop } from '../shop/shop.entity';
import { ProductRepository } from './product.repository';

@Entity({ customRepository: () => ProductRepository })
export class Product {

    [EntityRepositoryType]?: ProductRepository;

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    description?: string;

    @Property()
    amount! : number

    @ManyToOne()
    shop!: Shop;

    @Property()
    createdAt = new Date();

    @Property({
        onUpdate: () => new Date()
    })
    updatedAt = new Date();
    
    @ManyToOne()
    owner!: User;

    constructor(name: string, description: string, amount: number, shop: Shop, owner : User) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.shop = shop;
        this.owner = owner;
    }

}