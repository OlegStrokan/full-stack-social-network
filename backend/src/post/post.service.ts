import { HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "./post.model";
import { FileService } from "../file/file.service";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel)
    private postRepository: typeof PostModel,
    private fileService: FileService
  ) {}

  async create(createPostDto: CreatePostDto, image: File) {
    if (!image) {
      const post = await this.postRepository.create({
        ...createPostDto,
      });
      await post.save();
      const posts = await this.postRepository.findAll();
      return {
        data: posts,
        statusCode: HttpStatus.OK,
      };
    }
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName,
    });
    await post.save();
    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async findOne(id: number) {
    const post = await this.postRepository.findByPk(id);

    if (!post) {
      throw new HttpException("Post with this id not found", HttpStatus.NOT_FOUND);
    }
    return {
      data: post,
      statusCode: HttpStatus.OK,
    };
  }

  async update(id: number, updatePostDto: UpdatePostDto, image: File) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.findByPk(id);
    if (!post) {
      throw new HttpException("Post with this id not found", HttpStatus.NOT_FOUND);
    }
    await this.postRepository.update(
      {
        title: updatePostDto.title,
        content: updatePostDto.content,
        image: fileName,
      },
      { where: { id } }
    );

    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async delete(id: number) {
    await this.postRepository.destroy({
      where: {
        id,
      },
    });
    return {
      message: "success",
      statusCode: HttpStatus.ACCEPTED,
    };
  }

  async like(id: number) {
    const post = await this.postRepository.findByPk(id);
    post.likesCount++;

    await post.save();

    const posts = await this.postRepository.findAll();

    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async unlike(id: number) {
    const post = await this.postRepository.findByPk(id);
    post.likesCount--;

    await post.save();

    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }
}
