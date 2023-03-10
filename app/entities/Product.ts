import {
    Entity,
    EntityRepositoryType,
    ManyToOne,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { User } from './User';
import { Shop } from './Shop';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Product extends BaseEntity {

    @Property()
    name!: string;

    @Property()
    description?: string;

    @Property()
    amount! : number

    @ManyToOne()
    shop!: Shop;
    
    @ManyToOne()
    owner!: User;

    constructor(name: string, description: string, amount: number, shop: Shop, owner : User) {
        super()
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.shop = shop;
        this.owner = owner;
    }

}