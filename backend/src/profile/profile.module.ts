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
import { PostModule } from "../post/post.module";
import { PostModel } from "../post/models/post.model";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [
    SequelizeModule.forFeature([UserModel, FollowModel, PhotoModel, PostModel]),
    FileModule,
    RoleModule,
    PostModule,
    AuthModule,
    ClientsModule.register([
      {
        name: "chat-service",
        transport: Transport.RMQ,
        options: {
          urls: [
            "amqps://pzeydrqr:dqBqh8DgaglYzPhhgufBvVMsEQYcTWb0@rat.rmq2.cloudamqp.com/pzeydrqr",
          ],
          queue: "main_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class ProfileModule {}
