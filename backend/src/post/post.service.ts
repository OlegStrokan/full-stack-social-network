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
      await post.$set("likes", []);
      await post.$set("dislikes", []);
      await post.save();
      const newPost = await this.postRepository.findByPk(post.id, { include: { all: true } });
      return {
        data: newPost,
        statusCode: HttpStatus.OK,
      };
    }
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName,
    });
    await post.$set("likes", []);
    await post.$set("dislikes", []);
    await post.save();
    await this.photoRepository.create({
      userId: createPostDto.userId,
      url: fileName,
      postId: post.id,
    });

    const newPost = await this.postRepository.findByPk(post.id, { include: { all: true } });

    return {
      data: newPost,
      statusCode: HttpStatus.OK,
    };
  }

  async findAll() {
    return await this.postRepository.findAll({ include: { all: true } });
  }

  async findByUser(id: number) {
    return await this.postRepository.findAll({
      where: { userId: id },
      include: { all: true },
    });
  }

  async findOne(id: number) {
    const post = await this.findByUser(id);

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

    const posts = await this.findAll();
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

    const posts = await this.findAll();
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async like(postId: number, userId: number) {
    const post = await this.postRepository.findByPk(postId);
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (isAlreadyLiked) {
      throw new HttpException("You already liked this post", HttpStatus.BAD_REQUEST);
    }

    const isAlreadyUnliked = await this.dislikeRepository.findOne({
      where: { userId: userId, postId: postId },
    });

    if (isAlreadyUnliked) {
      await isAlreadyUnliked.destroy();
    }

    const like = await this.likeRepository.create({
      userId: userId,
      postId: postId,
    });

    await like.save();
    await post.save();

    const posts = await this.postRepository.findAll({
      where: { userId: post.userId },
      include: { all: true },
    });

    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async unlike(postId: number, userId: number) {
    const post = await this.postRepository.findByPk(postId);
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    await isAlreadyLiked.destroy();

    await post.save();

    const posts = await this.postRepository.findAll({
      where: { userId: post.userId },
      include: { all: true },
    });
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async dislike(postId: number, userId: number) {
    const post = await this.postRepository.findByPk(postId);
    const isAlreadyLiked = await this.likeRepository.findOne({
      where: { userId, postId },
    });

    if (isAlreadyLiked) await isAlreadyLiked.destroy();

    const dislike = await this.dislikeRepository.create({
      userId: userId,
      postId: postId,
    });

    await dislike.save();
    await post.save();

    const posts = await this.postRepository.findAll({
      where: { userId: post.userId },
      include: { all: true },
    });
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }

  async undislike(postId: number, userId: number) {
    const post = await this.postRepository.findByPk(postId);
    const isAlreadyUnliked = await this.dislikeRepository.findOne({
      where: { userId, postId },
    });

    if (!isAlreadyUnliked) {
      throw new HttpException("You haven't disliked this post yet", HttpStatus.BAD_REQUEST);
    }

    await isAlreadyUnliked.destroy();

    await post.save();

    const posts = await this.postRepository.findAll({
      where: { userId: post.userId },
      include: { all: true },
    });
    return {
      data: posts,
      statusCode: HttpStatus.OK,
    };
  }
}
