import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserModule } from './user.module';
import { UserModel } from './models/user.model';
import * as uuid from 'uuid';
import { MailService } from '../mail/mail.service';
import { RoleService } from '../role/role.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModule) private userRepository: typeof UserModel,
        private mailService: MailService, private roleService: RoleService,
    ) {
    }

    async create(userDto: CreateUserDto) {
        const activationLink = uuid.v4();
        const user = await this.userRepository.create(userDto);
        const role = await this.roleService.getRoleByValue('USER');
        await this.mailService.sendActivationMail(userDto.email, `http://localhost:5000/auth/activate/${activationLink}`);
        user.activationLink = activationLink;
        await user.$set('roles', [role.id]);
        user.roles = [role];
        await user.save();
        return user;
    }

    async addRole(dto: AddRoleDto, id: number) {
        const user = await this.userRepository.findByPk(id);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }
        throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
        return user;
    }

}
