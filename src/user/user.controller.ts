import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { UserType, UserRole } from './dto/index';
import { UserService } from './user.service';
const env = process.env;
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/index'


@Controller({
    path: 'user',
    version: '1'
})
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    @Post()
    @ApiBody({
        description: "Create user",
        type: CreateUserDto
    })
    async createUser(
        @Body() userData: CreateUserDto
    ): Promise<any> {
        let userType = "APP_USER";
        let userRole = "SUPERADMIN";
        let password = "12345";
    
        var data = {
            name: userData.name,
            email: userData.email,
            password : userData.password,
            type : UserType[<UserType>userType],
            role :  UserRole[<UserRole>userRole]
        }
        return this.userService.createUser(data);
    }
}
