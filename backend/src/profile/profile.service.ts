import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FollowModel } from 'src/user/models/follow.model';
import { UserModel } from '../user/models/user.model';
import { FileService } from '../file/file.service';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(UserModel) private userRepository: typeof UserModel,
        @InjectModel(FollowModel) private followRepository: typeof FollowModel,
        private fileService: FileService
    ) {}

    async follow(user_id: number, follow_id: number) {

        const user = await this.userRepository.findByPk(user_id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const followUser = await this.userRepository.findByPk(follow_id);
        if (!followUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        await followUser.$add('following', user_id);
        await user.$add('follower', follow_id);

        console.log(user_id, follow_id)
        const follow = await this.followRepository.create({
            user_id: user_id,
            follower_id: follow_id,
        });
        console.log(follow)

        await follow.save()
            console.log('hello')
        return 'success'
    }

    unfollow(user_id: number, unfollow_id: number) {}
    async getProfile(id: number) {

        const profile = await this.userRepository.findOne({ where: { id}})

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
            data: user, statusCode: HttpStatus.OK
        }
    }
    async changeStatus(id: number, status: string) {
        const user = await this.getProfile(+id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        user.status = status;
        user.save();
        return user;

    }
}
