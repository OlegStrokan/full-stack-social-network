import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'User with this email already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        return this.userService.create({
            ...userDto,
            password: hashPassword,
        });
    }

    async login(userDto: LoginUserDto) {
        return await this.validateUser(userDto);

    }

    async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getByEmail(userDto.email);

        if (!user) {
            throw new UnauthorizedException({ message: 'Incorrect email or password', statusCode: 400 });
        }

        const passwordEquals = await bcrypt.compare(userDto.password, user.password);

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({ message: 'Incorrect email or password', statusCode: 400 });
    }
}
