import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostModel } from './post.model';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([PostModel]),
    FileModule]
})
export class PostModule {}
