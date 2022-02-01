import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as uuid from 'uuid';
import { MailService } from '../mail/mail.service';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';
import { FileService } from '../file/file.service';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel)
        private userRepository: typeof UserModel,
        private mailService: MailService,
        private roleService: RoleService,
        private fileService: FileService,
    ) {}

    async create(userDto: CreateUserDto) {
        const fileName = '';
        const activationLink = uuid.v4();
        const user = await this.userRepository.create(userDto);
        const role = await this.roleService.getRoleByValue('USER');
        await this.mailService.sendActivationMail(
            userDto.email,
            `http://localhost:5000/auth/activate/${activationLink}`,
        );
        user.activationLink = activationLink;
        user.avatar = fileName;
        await user.$set('roles', [role.id]);
        await user.save();
        return user;
    }

    async getUsers() {
        return await this.userRepository.findAll({ include: { all: true } });
    }

    async addRole(id: number, dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(id);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async getByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
    }

    async ban(id: number, dto: BanUserDto) {
        const user = await this.userRepository.findByPk(id);
        if (user) {
            user.banned = true;
            user.banReason = dto.banReason;
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
}
