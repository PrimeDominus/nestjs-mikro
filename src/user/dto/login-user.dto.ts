import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class LoginUserDto {
    @ApiProperty({
        type: String,
        description: "Login Email"
    })
    @IsNotEmpty() 
    @IsEmail() 
    readonly email: string;
    
    @ApiProperty({
        type: String,
        description: "Login Password"
    })
    @IsNotEmpty() 
    @IsString() 
    readonly password: string;
}