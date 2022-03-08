import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectModel } from "@nestjs/sequelize";
import { PostModel } from "./models/post.model";
import { FileService } from "../file/file.service";
import { PhotoModel } from "../user/models/photo.model";
import { LikeModel } from "./models/like.model";
import { DislikeModel } from "./models/dislike.model";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel)
    private postRepository: typeof PostModel,
    @InjectModel(PhotoModel)
    private photoRepository: typeof PhotoModel,
    @InjectModel(LikeModel)
    private likeRepository: typeof LikeModel,
    @InjectModel(DislikeModel)
    private dislikeRepository: typeof DislikeModel,
    private fileService: FileService
  ) {}

  async create(createPostDto: CreatePostDto, image: File) {
    const user = this.postRepository.findOne({
      where: { userId: createPostDto.userId },
    });
    if (!user) {
      throw new HttpException("User with this id not found", HttpStatus.NOT_FOUND);
    }
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
    await this.photoRepository.create({
      userId: createPostDto.userId,
      url: fileName,
      postId: post.id,
    });

    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async findAll() {
    const posts = await this.postRepository.findAll({ include: { all: true } });
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
    const photo = await this.photoRepository.findOne({ where: { postId: id } });
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

    await this.photoRepository.update(
      {
        url: fileName,
      },
      { where: { id: photo.id } }
    );

    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async delete(id: number) {
    const photo = await this.photoRepository.findOne({ where: { postId: id } });
    await this.postRepository.destroy({
      where: {
        id,
      },
    });

    await this.photoRepository.destroy({
      where: {
        postId: photo.postId,
      },
    });

    const posts = await this.postRepository.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async like(id: number) {
    const post = await this.postRepository.findByPk(id);
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: { userId: post.userId, postId: post.id },
    });

    if (isAlreadyLiked) {
      throw new HttpException("You already liked this post", HttpStatus.BAD_REQUEST);
    }

    const like = await this.likeRepository.create({
      userId: post.userId,
      postId: post.id,
    });

    await like.save();

    console.log("success");

    await post.save();

    return {
      data: post,
      statusCode: HttpStatus.OK,
    };
  }

  async unlike(id: number) {
    const post = await this.postRepository.findByPk(id);
    console.log(post);
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: { userId: post.userId, postId: post.id },
    });

    if (!isAlreadyLiked) {
      throw new HttpException("You already liked this post", HttpStatus.BAD_REQUEST);
    }

    await isAlreadyLiked.destroy();

    await post.save();

    return {
      data: post,
      statusCode: HttpStatus.OK,
    };
  }
}
