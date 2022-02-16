import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { RoleModel } from "./models/role.model";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleRepository: typeof RoleModel
  ) {}

  async create(dto: CreateRoleDto) {
    await this.roleRepository.create(dto);
    return await this.roleRepository.findAll();
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({
      where: {
        value,
      },
    });

    if (!role) {
      throw new HttpException("Invalid role value", HttpStatus.BAD_REQUEST);
    }
    return role;
  }

  async getRoles() {
    return await this.roleRepository.findAll();
  }
}
