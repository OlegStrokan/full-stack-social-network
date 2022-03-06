import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PostModel } from "./models/post.model";
import { FileModule } from "../file/file.module";
import { PhotoModel } from "../user/models/photo.model";
import { LikeModel } from "./models/like.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    SequelizeModule.forFeature([PostModel, PhotoModel, LikeModel]),
    FileModule,
    AuthModule,
  ],
})
export class PostModule {}
