import { Shop } from "src/shop/shop.entity";

export interface IProductData {
    name: string;
    description: string;
    amount: number;
    shop: Shop;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProductRO {
    product: IProductData;
}