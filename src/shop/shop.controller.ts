import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { CreateShopDto } from './dto';
import { ShopService } from './shop.service';
import { LoginUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';

@Controller({
    path: 'shop',
    version: '1'
})
export class ShopController {

    constructor(
        private readonly shopService: ShopService,
        private readonly logger: Logger
    ) { }

    @Post()
    @ApiHeader({
        name: 'token',
        description: 'Pass login token , example value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    })
    @ApiBody({
        description: "Create shop",
        type: CreateShopDto
    })
    async createShop(
        @Body() shopData: CreateShopDto,
        @LoginUser() user: User
    ): Promise<any> {
        shopData.owner = user;
        return this.shopService.createShop(shopData);

    }

    @Get()
    @ApiHeader({
        name: 'token',
        description: 'Pass login token , example value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    })
    async getShopList(
        @Req() req: Request,
        @LoginUser() user: User
    ): Promise<any> {
        return this.shopService.getShopList();
    }

}
