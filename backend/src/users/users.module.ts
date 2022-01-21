import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { FollowerModel } from './models/follower/follower.model';
import { UserModel } from './models/user.model';
import { BlockedUserModel } from './models/blocked-user.model';
import { FollowModel } from './models/follow/follow.model';
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      BlockedUserModel,
      FollowerModel,
      FollowModel,
    ]),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
