import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../user/models/user.model";
import { FileService } from "../file/file.service";
import { UpdateStatusDto } from "../user/dto/update-status.dto";
import { UpdateUserDto } from "../user/dto/update-user.dto";
import { PhotoModel } from "../user/models/photo.model";
import { PostModel } from "../post/models/post.model";
import { FollowModel } from "../user/models/follow.model";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    @InjectModel(FollowModel) private followRepository: typeof FollowModel,
    @InjectModel(PhotoModel) private photoRepository: typeof PhotoModel,
    @InjectModel(PostModel) private postModel: typeof PostModel,
    private fileService: FileService
  ) {}

  async follow(userId: number, followId: number) {
    if (userId === followId) {
      throw new HttpException("You can't follow yourself", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findByPk(userId, { nest: true });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const followUser = await this.userRepository.findByPk(followId);

    if (!followUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const followModel = await this.followRepository.findOne({
      where: {
        followerId: followId,
      },
    });
    if (followModel) {
      throw new HttpException("You can't follow user two times", HttpStatus.BAD_REQUEST);
    }
    const follow = await this.followRepository.create({
      userId: userId,
      followerId: followId,
    });
    await follow.save();
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async unfollow(userId: number, unfollowId: number) {
    if (userId === unfollowId) {
      throw new HttpException("You can't unfollow yourself", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findByPk(userId);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const followUser = await this.userRepository.findByPk(unfollowId);

    if (!followUser) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const followModel = await this.followRepository.findOne({
      where: {
        followerId: unfollowId,
      },
    });
    if (!followModel) {
      throw new HttpException("You are not follow this user", HttpStatus.BAD_REQUEST);
    }
    await followModel.destroy();

    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async getProfile(id: number): Promise<any> {
    const user = await this.userRepository.findByPk(id, {
      include: { nested: true, all: true },
    });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async changeAvatar(id: number, avatar: File) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    user.avatar = await this.fileService.createFile(avatar);
    await user.save();
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async changeStatus(id: number, userDto: UpdateStatusDto) {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    user.status = userDto.status;
    await user.save();
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async activateProfile(id: number) {
    const user = await this.userRepository.findByPk(id);

    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    user.activated = true;
    await user.save();
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async updateProfile(id: number, dto: UpdateUserDto) {
    const email = await this.userRepository.findOne({ where: { email: dto.email } });

    if (email) {
      throw new HttpException("This email already existed", HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(
      {
        email: dto.email,
        fullname: dto.fullname,
        location: dto.location,
        birth: dto.birth,
        job: dto.job,
        about: dto.about,
        interests: dto.interests,
      },
      { where: { id } }
    );

    const user = await this.userRepository.findByPk(id);
    return {
      data: user,
      statusCode: HttpStatus.OK,
    };
  }

  async addPhoto(id: number, image) {
    const user = await this.userRepository.findOne({ where: { id }, include: { all: true } });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    const fileName = await this.fileService.createFile(image);

    const savedImage = await this.photoRepository.create({ userId: id, url: fileName });
    await savedImage.save();

    return {
      user,
      statusCode: HttpStatus.OK,
    };
  }
}
