export interface IShopData {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShopRO {
    shop: IShopData;
}