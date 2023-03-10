import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ValidationPipe } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';

import { ShopController } from '../shop.controller';
import { ShopRepository } from '../shop.repository';
import { ShopService } from '../shop.service';
import { Shop } from '../shop.entity';
import { CreateShopDto, UpdateShopDto } from '../dto';

describe('ShopController', () => {
    let shopController: ShopController;
    let shopService: ShopService;
    let shopRepo: ShopRepository;

    const mockShopService = {
        getShopList: jest.fn(() => {
            return [
                { id: 1, name: "shop name 1", description: "shop description 1" },
                { id: 2, name: "shop name 2", description: "shop description 2" },
                { id: 3, name: "shop name 3", description: "shop description 3" },
            ]
        }),

        getShopDetails: jest.fn((shopId: number) => {
            return { id: 1, name: "shop name 1", description: "shop description 1" }
        }),

        createShop: jest.fn((dto: CreateShopDto) => {
            return {
                name: 'Shop',
                description: "description",
                createdAt: "2022-06-29 10:08:28.000 +0530",
                updatedAt: "2022-06-29 10:08:28.000 +0530"
            }
        }),

        updateShop: jest.fn((id: number, dto: UpdateShopDto) => {
            return {
                name: 'Shop',
                description: "description",
                createdAt: "2022-06-29 10:08:28.000 +0530",
                updatedAt: "2022-06-29 10:08:28.000 +0530"
            }
        }),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ShopController],
            providers: [ShopService],

        }).overrideProvider(ShopService).useValue(mockShopService).overridePipe(ValidationPipe).useClass(new ValidationPipe()).compile();

        shopController = module.get<ShopController>(ShopController);
    });

    it("controller defined", () => {
        expect(shopController).toBeDefined();
    })

    it('find all result', async () => {
        expect(await shopController.getShopList()).toStrictEqual([
            { id: 1, name: "shop name 1", description: "shop description 1" },
            { id: 2, name: "shop name 2", description: "shop description 2" },
            { id: 3, name: "shop name 3", description: "shop description 3" },
        ])
    })

    it('shop details', async () => {
        let shopId = 1;
        expect(await shopController.getShopDetails(shopId)).toEqual(
            { id: shopId, name: "shop name 1", description: "shop description 1" }
        )
    })

    it('shop create', async () => {
        expect(await shopController.createShop({
            name: 'Shop',
            description: "description"

        })).toEqual(
            {
                name: 'Shop',
                description: "description",
                createdAt: "2022-06-29 10:08:28.000 +0530",
                updatedAt: "2022-06-29 10:08:28.000 +0530"
            }
        )
    })

    it('shop update', async () => {
        expect(await shopController.updateShop(1, {
            name: 'Shop',
            description: "description"
        })).toEqual(
            {
                name: 'Shop',
                description: "description",
                createdAt: "2022-06-29 10:08:28.000 +0530",
                updatedAt: "2022-06-29 10:08:28.000 +0530"
            }
        )
    })
});
