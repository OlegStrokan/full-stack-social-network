import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "./models/role.model";
import { UserModel } from "../user/models/user.model";
import { UserRolesModel } from "./models/user-roles.model";

@Module({
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
