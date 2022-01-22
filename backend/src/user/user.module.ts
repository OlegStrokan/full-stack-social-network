import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { BlockedUserModel } from './models/blocked-user.model';
import { MailModule } from '../mail/mail.module';
import { UserController } from './user.controller';
import { UserRolesModel } from '../role/models/user-roles.model';
import { AuthModule } from '../auth/auth.module';
import { RoleModel } from '../role/models/role.model';
import { RoleModule } from '../role/role.module';
import { FollowModel } from './models/follow/follow.model';
import { FollowerModel } from './models/follower/follower.model';
import { UserFollowModel } from './models/follow/user-follow.model';
import { UserFollowerModel } from './models/follower/user-follower.model';

@Module({
    imports: [
        SequelizeModule.forFeature([
            UserModel,
            BlockedUserModel,
            RoleModel,
            UserRolesModel,
            FollowModel,
            FollowerModel,
            UserFollowModel,
            UserFollowerModel
        ]),
        MailModule,
        RoleModule,
        forwardRef(() => AuthModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
