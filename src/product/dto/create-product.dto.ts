import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Shop } from 'src/shop/shop.entity';
import { User } from 'src/user/user.entity';

export class CreateProductDto {
    @ApiProperty({
        type: String,
        description: "Name of the shop"
    })
    @IsNotEmpty() 
    @IsString() 
    readonly name: string;

    @ApiProperty({
        type: String,
        description: "Description of the shop"
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        type: Number,
        description: "Amount/Price of the product"
    })
    @IsNotEmpty()
    @IsNumber()
    readonly amount: number;

    @ApiProperty({
        type: Number,
        description: "shop ID"
    })
    @IsNotEmpty()
    readonly shop: Shop;

    @ApiProperty({
        type: Number,
        description: "user ID"
    })
    @IsNotEmpty()
    readonly owner: User;

}