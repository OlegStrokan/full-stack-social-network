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
import { FollowModel } from './models/follow.model';
import { FileModule } from '../file/file.module';
import { PostModel } from '../post/post.model';

@Module({
    imports: [
        SequelizeModule.forFeature([UserModel, BlockedUserModel, RoleModel, UserRolesModel, FollowModel, PostModel]),
        MailModule,
        RoleModule,
        FileModule,
        forwardRef(() => AuthModule),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
