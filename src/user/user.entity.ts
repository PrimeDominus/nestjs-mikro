import {
    Collection,
    Entity,
    EntityRepositoryType,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Product } from '../product/product.entity';
import { Shop } from '../shop/shop.entity';
import { UserRepository } from './user.repository';

@Entity({ customRepository: () => UserRepository })
export class User {

    [EntityRepositoryType]?: UserRepository;

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    email! : string;

    @Property()
    password! : string;

    @Property()
    createdAt = new Date();

    @Property({
        onUpdate: () => new Date()
    })
    updatedAt = new Date();

    @OneToMany(() => Shop, shop => shop.owner)
    shop = new Collection<Shop>(this);

    @OneToMany(() => Product, product => product.owner)
    product = new Collection<Product>(this);
    

    constructor( name : string, email : string, password: string ) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

}