import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModel } from "./models/role.model";
import { UserModel } from "../user/models/user.model";
import { UserRolesModel } from "./models/user-roles.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [SequelizeModule.forFeature([RoleModel, UserModel, UserRolesModel]), AuthModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
