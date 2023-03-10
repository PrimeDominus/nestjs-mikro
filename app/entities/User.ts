import {
    Collection,
    Entity,
    EntityRepositoryType,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Product } from './Product';
import { Shop } from './Shop';

@Entity()
export class User extends BaseEntity {

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email! : string;

    @Property()
    password! : string;
    

    @OneToMany(() => Shop, shop => shop.owner)
    shop = new Collection<Shop>(this);

    @OneToMany(() => Product, product => product.owner)
    product = new Collection<Product>(this);
    

    constructor( name : string, email : string, password: string ) {
        super()
        this.name = name;
        this.email = email;
        this.password = password;
    }

}