import {
    Collection,
    Entity,
    EntityRepositoryType,
    Enum,
    JsonType,
    ManyToOne,
    OneToMany,
    PrimaryKey,
    Property,
} from '@mikro-orm/core';
import { Permission } from 'src/permission/permission.entity';
import { Product } from 'src/product/product.entity';
import { Shop } from 'src/shop/shop.entity';
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
    
    @Enum({
        items : ["APP_USER", "ORG_USER", "SERVICE_PROVIDER_USER", "SERVICE_RECEIVER_USER"],
        default : "SERVICE_RECEIVER_USER"
    })
    type! : string

    @Enum({
        items : ["SUPERADMIN", "ADMIN", "MANAGER", "SUPPORT", "OWNER", "MEMBER", "SALES", "GP", "CUSTOMER"],
        default : "CUSTOMER"
    })
    role! : string

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

    @OneToMany(() => Permission, permission => permission.user)
    permission = new Collection<Permission>(this);
    

    constructor( name : string, email : string, password: string, type : string, role : string ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.role = role;
    }

}