import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export enum UserType {
    APP_USER = "APP_USER",
    ORG_USER = "ORG_USER",
    SERVICE_PROVIDER_USER = "SERVICE_PROVIDER_USER",
    SERVICE_RECEIVER_USER = "SERVICE_RECEIVER_USER"
}

export enum UserRole {
    SUPERADMIN = "SUPERADMIN",
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SUPPORT = "SUPPORT",
    OWNER = "OWNER",
    MEMBER = "MEMBER",
    SALES = "SALES",
    GP = "GP",
    CUSTOMER = "CUSTOMER"
}

export class CreateUserDto {
    @ApiProperty({
        type: String,
        description: "User fullname"
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;


    @ApiProperty({
        type: String,
        description: "user Email"
    })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({
        type: String,
        description: "user Password"
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}