import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { EntityRepository } from '@mikro-orm/core';
import { Shop } from './shop.entity';
import { CreateShopDto } from './dto';
import { IShopRO } from './shop.interface';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop)
        private shopRepository: EntityRepository<Shop>, //ShopRepository,
    ) { }

    private buildShopRO(shop: Shop) {
        const shopRO = {
            name: shop.name,
            description: shop.description,
            createdAt : shop.createdAt,
            updatedAt : shop.updatedAt,
            owner : shop.owner

        };

        return { shop: shopRO };
    }

    async createShop (dto : CreateShopDto): Promise<IShopRO> {
        const {name, description, owner} = dto;
        const shop = new Shop(name,description,owner);
        const errors = await validate(shop);

        if(errors.length > 0) {
            throw new Error("Wrong Data Validation");
            
        }else {
            await this.shopRepository.persistAndFlush(shop);
            return this.buildShopRO(shop);

        }
    }

    async getShopList () : Promise<Shop[]> {
        const shops = this.shopRepository.findAll({
            orderBy:{id:'asc'},
            populate: ['products', 'owner']          
        });
        return shops
    }
}
