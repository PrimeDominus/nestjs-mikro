import { getRepositoryToken } from '@mikro-orm/nestjs';
import { ContextIdFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopRepository } from '../shop.repository';
import { ShopService } from '../shop.service';
import { Shop } from '../shop.entity';

describe('UsersService', () => {
    let shopService: ShopService;
    let repo: ShopRepository;

    const contextId = ContextIdFactory.create();

    const shopArray = [
        new Shop('shop name 1', 'shop description 1'),
        new Shop('shop name 2', 'shop description 2'),
        new Shop('shop name 3', 'shop description 3'),
    ];

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            providers: [
                ShopService,
                {
                    provide: getRepositoryToken(Shop),
                    // define all the methods that you use from the catRepo
                    // give proper return values as expected or mock implementations, your choice
                    useValue: {
                        find: jest.fn().mockResolvedValue(shopArray)
                    },
                },
            ],
        }).compile();

        shopService = await moduleRef.resolve<ShopService>(ShopService, contextId);
        // repo = moduleRef.resolve<ShopRepository>(ShopRepository, contextId);
    });
});