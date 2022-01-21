import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsersModule } from './users.module';
import { UserModel } from './models/user.model';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {

    constructor(@InjectModel(UsersModule) private userRepository: typeof UserModel) {
    }

    async create(userDto: CreateUserDto) {
        const activationLink = uuid.v4();
        const user = await this.userRepository.create(userDto);
        user.activationLink = activationLink
        await user.save();
        return user;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
        return user;
    }

    findAll() {
        return `This action returns all users`;
    }


    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

}
