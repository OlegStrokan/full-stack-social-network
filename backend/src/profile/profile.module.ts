import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { FollowModel } from '../user/models/follow.model';
import { FileModule } from '../file/file.module';

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [SequelizeModule.forFeature([UserModel, FollowModel]), FileModule],
})
export class ProfileModule {}
