import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto';
const env = process.env;
import { JwtService } from '@nestjs/jwt';

@Controller({
    path: 'auth',
    version: '1'
})
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService
    ) { }

    @Post('login')
    @ApiBody({
        description: "Login user",
        type: LoginAuthDto
    })
    async login(
        @Body() loginData: LoginAuthDto
    ): Promise<any> {
        const login: any = await this.authService.login(loginData);

        if (login) {
            var payload = this.jwtService.sign( { id: login.id },
                {
                    secret: env.JWT_SECRET_KEY
                }
            );
            
            return {
                token : payload,
                user : login
            };
        } else {
            throw new HttpException({
                message: "Unauthorize",
                errors: "User not found"
            }, HttpStatus.UNAUTHORIZED)
        }

    }

}
