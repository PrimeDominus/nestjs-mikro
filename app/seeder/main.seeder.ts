
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { User, Shop,Product } from '../entities';

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
            createdAt: "2023-02-23 05:32:13.921",
            updatedAt : "2023-02-23 05:32:13.921"
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
            createdAt: "2023-02-23 05:32:13.921",
            updatedAt : "2023-02-23 05:32:13.921"
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
            createdAt: "2023-02-23 05:32:13.921",
            updatedAt : "2023-02-23 05:32:13.921"
        });
    }
}
