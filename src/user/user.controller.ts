import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiParam } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { LoginUserDto, UserType, UserRole } from './dto/index';
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

    // @Post('login')
    // @ApiHeader({
    //     name: 'x-access-token',
    //     description: 'Custom header for api access token , example value : 12345',
    // })
    // @ApiBody({
    //     description: "Create product",
    //     type: LoginUserDto
    // })
    // async createProduct(
    //     @Body() loginData: LoginUserDto
    // ): Promise<any> {
    //     const login: any = await this.userService.userLogin(loginData);

    //     if (login) {
    //         var payload = this.jwtService.sign( { id: login.id },
    //             {
    //                 secret: env.JWT_SECRET_KEY
    //             }
    //         );
            
    //         return {
    //             token : payload,
    //             user : login
    //         };
    //     } else {
    //         throw new HttpException({
    //             message: "Unauthorize",
    //             errors: "User not found"
    //         }, HttpStatus.UNAUTHORIZED)
    //     }

    // }

    @Post()
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
    @ApiBody({
        description: "Create user",
        type: CreateUserDto
    })
    async createProduct(
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

    @Get("/:userId")
    @ApiHeader({
        name: 'x-access-token',
        description: 'Custom header for api access token , example value : 12345',
    })
    @ApiParam({
        name: "userId"
    })
    async getProductDetails(
        @Param() params
    ): Promise<any> {
        return this.userService.getUserDetails(params.userId);
    }
}
