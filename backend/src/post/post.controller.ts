import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFile,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    create(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(createPostDto, image);
    }

    @Get()
    getAllPosts() {
        return this.postService.findAll();
    }

    @Get('/:id')
    getPost(@Param('id') id: string) {
        return this.postService.findOne(+id);
    }

    @Patch('/:id')
    update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
        @UploadedFile() image,
    ) {
        return this.postService.update(+id, updatePostDto, image);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.postService.delete(+id);
    }

    @Patch('/like/:id')
    like(@Param('id') id: string) {
        return this.postService.like(+id);
    }

    @Delete('/like/:id')
    unlike(@Param('id') id: string) {
        return this.postService.unlike(+id);
    }
}
