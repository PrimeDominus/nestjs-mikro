import { JsonType } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator'

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

    @ApiProperty({
        type: String,
        description: "user type"
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(UserType)
    readonly type: UserType;

    @ApiProperty({
        type: String,
        description: "role type"
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(UserRole)
    readonly role: UserRole;
}