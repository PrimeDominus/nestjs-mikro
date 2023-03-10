import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { wrap, EntityRepository, UseRequestContext } from '@mikro-orm/core';
import { ShopRepository } from './shop.repository';
import { Shop } from './shop.entity';
import { CreateShopDto, UpdateShopDto } from './dto';
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

    async getShopDetails (shopId:number) : Promise<Shop> {
        return this.shopRepository.findOne(shopId,{
            populate: ['products','owner']
        });
    }

    async updateShop(shopId: number, dto: UpdateShopDto) : Promise<IShopRO> {
        const shop = await this.shopRepository.findOne(shopId);
        wrap(shop).assign(dto);
        this.shopRepository.flush();
        return this.buildShopRO(shop);
    }
}