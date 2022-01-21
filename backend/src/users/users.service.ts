import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModule } from './users.module';
import { UserModel } from './models/user.model';
import * as uuid from 'uuid';
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {

    constructor(@InjectModel(UsersModule) private userRepository: typeof UserModel, private mailService: MailService ) {
    }

    async create(userDto: CreateUserDto) {
        const activationLink = uuid.v4();
        const user = await this.userRepository.create(userDto);
        await this.mailService.sendActivationMail(userDto.email, `http://localhost:5000/auth/activate/${activationLink}`);
        user.activationLink = activationLink
        await user.save();
        return user;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

}
