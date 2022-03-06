import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { FollowModel } from "../user/models/follow.model";
import { FileModule } from "../file/file.module";
import { PhotoModel } from "../user/models/photo.model";
import { RoleModule } from "../role/role.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([UserModel, FollowModel, PhotoModel]),
    FileModule,
    RoleModule,
    AuthModule,
  ],
})
export class ProfileModule {}
