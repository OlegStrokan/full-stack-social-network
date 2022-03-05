import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors, UseGuards
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { PostModel } from "./models/post.model";
import { FileInterceptor } from "@nestjs/platform-express";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/role-auth.decorator";

@ApiTags("Posts functional")
@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: "Create new post" })
  @ApiOkResponse({ status: 200, type: PostModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(createPostDto, image);
  }

  @ApiOperation({ summary: "Find all posts" })
  @ApiOkResponse({ status: 200, type: [PostModel] })
  @Get()
  getAllPosts() {
    return this.postService.findAll();
  }

  @ApiOperation({ summary: "Find post" })
  @ApiOkResponse({ status: 200, type: PostModel })
  @Get("/:id")
  getPost(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @ApiOperation({ summary: "Update a post" })
  @ApiOkResponse({ status: 200, type: PostModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor("image"))
  @Patch("/:id")
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() image
  ) {
    console.log(id, updatePostDto, image);
    return this.postService.update(+id, updatePostDto, image);
  }

  @ApiOperation({ summary: "Delete a post" })
  @ApiOkResponse({ status: 200 })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete("/:id")
  delete(@Param("id") id: string) {
    return this.postService.delete(+id);
  }

  @ApiOperation({ summary: "Like a post" })
  @ApiOkResponse({ status: 200, type: PostModel })
  @UseGuards(RolesGuard)
  @Roles("ADMIN", "USER")
  @Patch("/like/:id")
  like(@Param("id") id: string) {
    return this.postService.like(+id);
  }

  @ApiOperation({ summary: "Unlike a post" })
  @ApiOkResponse({ status: 200, type: PostModel })
  @Roles("ADMIN", "USER")
  @UseGuards(RolesGuard)
  @Delete("/like/:id")
  unlike(@Param("id") id: string) {
    return this.postService.unlike(+id);
  }
}
