import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { ApiBody, ApiHeader, ApiParam } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CreateShopDto, UpdateShopDto } from './dto';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';
import { DefaultActions } from 'src/app.action';
import { LoginUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { subject } from '@casl/ability';
// import { DefaultActions } from 'nest-casl';

// @Controller('shop')
@Controller({
    path: 'shop',
    version: '1'
})
export class ShopController {

    constructor(
        private readonly shopService: ShopService,
        private readonly logger: Logger,
        private caslAbilityFactory: CaslAbilityFactory
    ) { }

    // @UsePipes(new ValidationPipe())
    @Post()
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
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
        const ability = this.caslAbilityFactory.createForShop(user);

        if (ability.can(DefaultActions.create, Shop)) {
            shopData.owner = user;
            return this.shopService.createShop(shopData);
        }else {
            throw new HttpException({
                message: "Unauthorize",
                errors: "You don't have permission to use this end point."
              }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    @Get()
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
    @ApiHeader({
        name: 'token',
        description: 'Pass login token , example value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    })
    async getShopList(
        @Req() req: Request,
        @LoginUser() user: User
    ): Promise<any> { 

        const ability = this.caslAbilityFactory.createForShop(user);

        if (ability.can(DefaultActions.read, Shop)) {
            return this.shopService.getShopList();
        }else {
            throw new HttpException({
                message: "Unauthorize",
                errors: "You don't have permission to use this end point."
              }, HttpStatus.UNPROCESSABLE_ENTITY);
        }

    }

    @Get("/:shopId")
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
    @ApiHeader({
        name: 'token',
        description: 'Pass login token , example value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    })
    @ApiParam({
        name: "shopId"
    })
    async getShopDetails(
        @Param() params
    ): Promise<any> {
        return this.shopService.getShopDetails(params.shopId);
    }

    @Put("/:shopId")
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
    @ApiHeader({
        name: 'token',
        description: 'Pass login token , example value : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI',
    })
    @ApiBody({
        description: "Update shop details",
        type: UpdateShopDto
    })
    @ApiParam({
        name: "shopId"
    })
    async updateShop(
        @Param() params,
        @Body() shopData: UpdateShopDto,
        @LoginUser() user: User
    ): Promise<any> {

        // const users = new User(user.name, user.email, user.password, user.type, user.role);
        // users.id = user.id

        const ability = this.caslAbilityFactory.createForShop(user);

        console.log("permission :", ability.can(DefaultActions.update, Shop))
        
        if (ability.can(DefaultActions.update, subject("Shop",Shop))) {
            return this.shopService.updateShop(params.shopId, shopData);
        }else {
            throw new HttpException({
                message: "Unauthorize",
                errors: "You don't have permission to use this end point."
              }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }




}
