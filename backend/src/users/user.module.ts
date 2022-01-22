import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { FollowerModel } from './models/follower/follower.model';
import { UserModel } from './models/user.model';
import { BlockedUserModel } from './models/blocked-user.model';
import { FollowModel } from './models/follow/follow.model';
import { MailModule } from '../mail/mail.module';
import { UserController } from './user.controller';
import { UserRolesModel } from '../role/models/user-roles.model';
import { RoleModule } from '../role/role.module';

@Module({
    imports: [
        SequelizeModule.forFeature([
            UserModel,
            BlockedUserModel,
            FollowerModel,
            FollowModel,
            RoleModule,
            UserRolesModel
        ]),
        MailModule,
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
