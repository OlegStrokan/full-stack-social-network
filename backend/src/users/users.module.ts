import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './models/users.model';
import { BlockedUsersModel } from './models/blocked-users.model';
import { FollowersModel } from './models/followers.model';
import { FollowsModel } from './models/follows.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UsersModel,
      BlockedUsersModel,
      FollowersModel,
      FollowsModel,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
