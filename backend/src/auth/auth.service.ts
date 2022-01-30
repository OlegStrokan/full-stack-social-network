import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '../user/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'User with this email already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);

        await this.userService.create({
            ...userDto,
            password: hashPassword,
        });

        return {
            message: 'Registration was successful',
            statusCode: HttpStatus.OK,
        };
    }

    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getByEmail(userDto.email);

        if (!user) {
            throw new UnauthorizedException({
                message: 'Incorrect email or password',
                statusCode: HttpStatus.UNAUTHORIZED,
            });
        }

        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({
            message: 'Incorrect email or password',
            statusCode: HttpStatus.UNAUTHORIZED,
        });
    }

    private async generateToken(user: UserModel) {
        const payload = { email: user.email, id: user.id, roles: user.roles };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
