import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FollowModel } from 'src/user/models/follow.model';
import { UserModel } from '../user/models/user.model';
import { FileService } from '../file/file.service';
import { UpdateStatusDto } from '../user/dto/update-status.dto';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(UserModel) private userRepository: typeof UserModel,
        @InjectModel(FollowModel) private followRepository: typeof FollowModel,
        private fileService: FileService,
    ) {}

    async follow(user_id: number, follow_id: number) {
        if (user_id === follow_id) {
            throw new HttpException(
                "You can't follow yourself",
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findByPk(user_id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const followUser = await this.userRepository.findByPk(follow_id);

        if (!followUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const followModel = await this.followRepository.findOne({
            where: { follower_id: follow_id },
        });
        if (followModel) {
            throw new HttpException(
                "You can't follow user two times",
                HttpStatus.BAD_REQUEST,
            );
        }
        const follow = await this.followRepository.create({
            user_id: user_id,
            follower_id: follow_id,
        });
        await follow.save();
        return { statusCode: HttpStatus.OK };
    }

    async unfollow(user_id: number, unfollow_id: number) {
        if (user_id === unfollow_id) {
            throw new HttpException(
                "You can't unfollow yourself",
                HttpStatus.BAD_REQUEST,
            );
        }

        const user = await this.userRepository.findByPk(user_id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const followUser = await this.userRepository.findByPk(unfollow_id);

        if (!followUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const followModel = await this.followRepository.findOne({
            where: { follower_id: unfollow_id },
        });
        if (!followModel) {
            throw new HttpException(
                'You are not follow this user',
                HttpStatus.BAD_REQUEST,
            );
        }
        await followModel.destroy();

        return { statusCode: HttpStatus.OK };
    }
    async getProfile(id: number) {
        const profile = await this.userRepository.findOne({ where: { id } });

        if (!profile) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return profile;
    }

    async changeAvatar(id: number, avatar: File) {
        const user = await this.getProfile(+id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.avatar = await this.fileService.createFile(avatar);
        return {
            data: user,
            statusCode: HttpStatus.OK,
        };
    }
    async changeStatus(id: number, userDto: UpdateStatusDto) {
        const user = await this.getProfile(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.status = userDto.status;
        await user.save();
        return user;
    }

    async activateProfile(id: number) {
        const user = await this.getProfile(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.activated = true;
        await user.save();
        return user;
    }
}
