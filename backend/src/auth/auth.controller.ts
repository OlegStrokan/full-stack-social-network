import { Body, Controller, Get, Post, UploadedFile } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto, @UploadedFile() image) {
        return this.authService.registration(userDto, image);
    }

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }
}
