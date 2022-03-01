import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { UserModel } from "./user/models/user.model";
import { BlockedUserModel } from "./user/models/blocked-user.model";
import { RoleModule } from "./role/role.module";
import { RoleModel } from "./role/models/role.model";
import { UserRolesModel } from "./role/models/user-roles.model";
import { ProfileModule } from "./profile/profile.module";
import { FollowModel } from "./user/models/follow.model";
import { FileModule } from "./file/file.module";
import { PostModule } from "./post/post.module";
import { PostModel } from "./post/models/post.model";
import { PhotoModel } from "./user/models/photo.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "static"),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        UserModel,
        BlockedUserModel,
        FollowModel,
        RoleModel,
        UserRolesModel,
        PostModel,
        PhotoModel,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MailModule,
    RoleModule,
    PostModule,
    ProfileModule,
    FileModule,
  ],
})
export class AppModule {}
