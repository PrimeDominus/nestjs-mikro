import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiHeader } from '@nestjs/swagger';
import { CreateProductDto } from './dto';
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
