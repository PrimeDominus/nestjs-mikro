import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginAuthDto {
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