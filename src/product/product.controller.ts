import { Body, Controller, Get, Param, Post, Put, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiParam } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { CreateProductDto, UpdateProductDto } from './dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller({
    path : 'product',
    version : '1'
})
export class ProuductController {

    constructor(
        private readonly productService: ProductService
    ) { }

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
        description: "Create product",
        type: CreateProductDto
    })
    async createProduct(
        @Body() productData: CreateProductDto
    ): Promise<any> {
        return this.productService.createProduct(productData);
    }
    
}
