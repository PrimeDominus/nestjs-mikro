
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../product/product.entity';
import { Shop } from '../shop/shop.entity';
import { User } from '../user/user.entity';

export class MainSeeder extends Seeder {
    async run(
        em: EntityManager,
        context: Dictionary,
    ): Promise<void> {
        // save the entity to the context


        const userVal = {
            "name": "sp",
            "email": "sp-1@yopmail.com",
            "password": "$2a$10$HfmJVlR/nCha8wtpP9KSdusVu/v6tYBNeam2iZIK9Eu7sWVR3s5qC"
        }
        em.create(User, {
            name: userVal.name,
            email: userVal.email,
            password: userVal.password,
        });

        const shopVal = {
            "name": "string",
            "description": "string",
            "owner": 1
        }
        em.create(Shop, {
            name: shopVal.name,
            description: shopVal.description,
            owner: shopVal.owner,
        });

        const productVal = {
            "name": "string",
            "description": "string",
            "amount": 0,
            "shop": 1,
            "owner": 1
        }
        em.create(Product, {
            name: productVal.name,
            description: productVal.description,
            amount: productVal.amount,
            shop: productVal.shop,
            owner: productVal.owner,
        });
    }
}
