import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post()
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }

    @Post()
    login(@Body() userDto: Omit<CreateUserDto, 'fullname' | 'username'>) {
        return this.authService.login(userDto);
    }
}
