import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { wrap } from '@mikro-orm/core';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { IProductRO } from './product.interface';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository
    ) { }

    private buildProductRO(product: Product) {
        const productRO = {
            name: product.name,
            description: product.description,
            amount: product.amount,
            shop: product.shop,
            createdAt : product.createdAt,
            updatedAt : product.updatedAt,
            owner : product.owner

        };

        return { product: productRO };
    }

    async createProduct (dto:CreateProductDto) : Promise<IProductRO> {
        const {name, description, amount, shop, owner} = dto;
        const product = new Product(name,description,amount, shop, owner);
        const errors = await validate(product);

        if(errors.length > 0) {
            throw new Error("Wrong Data Validation");
            
        }else {
            
            await this.productRepository.persistAndFlush(product);
            return this.buildProductRO(product);

        }
    }

    async getProductList () : Promise<Product[]> {
        const shops = this.productRepository.findAll({
            orderBy:{id:'asc'},
            // populate: ["shop","owner"]            
        });
        return shops
    }

    async getProductDetails (productId:number) : Promise<Product> {
        return this.productRepository.findOne(productId,{
            populate: ['shop', 'owner']
        });
    }

    async update(productId: number, dto: UpdateProductDto) : Promise<IProductRO> {
        const product = await this.productRepository.findOne(productId);
        wrap(product).assign(dto);
        this.productRepository.flush();
        return this.buildProductRO(product);
    }
}