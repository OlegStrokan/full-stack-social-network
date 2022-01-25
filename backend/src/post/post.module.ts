import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [FileModule]
})
export class PostModule {}
