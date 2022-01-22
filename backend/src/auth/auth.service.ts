import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    registration(userDto: CreateUserDto) {
        const candidate = this.userService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'User with this email already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = bcrypt.hash(userDto.password, 5);
        const user = this.userService.create({
            ...userDto,
            password: hashPassword,
        });
        return user;
    }

    login(userDto: Omit<CreateUserDto, 'fullname' | 'username'>) {}
}
