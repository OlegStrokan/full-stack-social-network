import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RoleModel } from './models/role.model';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(RoleModel) private roleRepository: typeof RoleModel,
    ) {}

    async create(dto: CreateRoleDto) {
        return await this.roleRepository.create(dto);
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } });

        if (!role) {
            throw new HttpException(
                'Invalid role value',
                HttpStatus.BAD_REQUEST,
            );
        }
        return role;
    }
}
