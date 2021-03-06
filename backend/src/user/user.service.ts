import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./models/user.model";
import * as uuid from "uuid";
import { MailService } from "../mail/mail.service";
import { RoleService } from "../role/role.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
    private mailService: MailService,
    private roleService: RoleService
  ) {}

  async create(userDto: CreateUserDto) {
    const activationLink = uuid.v4();
    const user = await this.userRepository.create(userDto);
    const role = await this.roleService.getRoleByValue("admin");
    await this.mailService.sendActivationMail(
      userDto.email,
      `http://localhost:8000/auth/activate/${activationLink}`
    );
    user.activationLink = activationLink;
    user.avatar =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";
    await user.$set("roles", [role.id]);
    user.roles = [role];
    await user.save();
    return await this.userRepository.findAll();
  }

  async getUsers() {
    return await this.userRepository.findAll({
      include: {
        all: true,
      },
    });
  }

  async updatePassword(userId: number, password: string) {
    return await this.userRepository.update({ password }, { where: { id: userId } });
  }

  async addRole(id: number, dto: AddRoleDto): Promise<UserModel[]> {
    const user = await this.userRepository.findByPk(id);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add("role", role.id);
      return await this.userRepository.findAll({ include: { all: true } });
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
      include: {
        all: true,
      },
    });
  }

  async getById(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      include: {
        all: true,
      },
    });
  }

  async ban(id: number, dto: BanUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return await this.userRepository.findAll();
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  async unban(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (user) {
      user.banned = false;
      user.banReason = null;
      await user.save();
      return await this.userRepository.findAll();
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }
}
