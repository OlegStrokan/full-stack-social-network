import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserModel } from '../user/models/user.model';

@ApiTags('Auth functional')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'Registration',
    })
    @ApiOkResponse({
        status: 200,
    })
    @Post('/registration')
    registration(
        @Body()
        userDto: CreateUserDto,
    ) {
        return this.authService.registration(userDto);
    }

    @ApiOperation({
        summary: 'Login',
    })
    @ApiOkResponse({
        status: 200,
        type: UserModel,
    })
    @Post('/login')
    login(
        @Body()
        userDto: LoginUserDto,
    ) {
        return this.authService.login(userDto);
    }
}
