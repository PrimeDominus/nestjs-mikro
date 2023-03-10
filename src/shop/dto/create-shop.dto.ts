import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { User } from '../../user/user.entity';

export class CreateShopDto {
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
        description: "user ID"
    })
    // @IsNotEmpty()
    owner: User;

}