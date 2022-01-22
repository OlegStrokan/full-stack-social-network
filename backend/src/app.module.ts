import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { UserModel } from './users/models/user.model';
import { FollowModel } from './users/models/follow/follow.model';
import { FollowerModel } from './users/models/follower/follower.model';
import { BlockedUserModel } from './users/models/blocked-user.model';
import { UserFollowerModel } from './users/models/follower/user-follower.model';
import { UserFollowModel } from './users/models/follow/user-follow.model';
import { RoleModule } from './role/role.module';
import { RoleModel } from './role/models/role.model';
import { UserRolesModel } from './role/models/user-roles.model';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [
                UserModel,
                FollowModel,
                FollowerModel,
                BlockedUserModel,
                UserFollowerModel,
                UserFollowModel,
                RoleModel,
                UserRolesModel,
            ],
            autoLoadModels: true,
        }),
        UserModule,
        AuthModule,
        MailModule,
        RoleModule,
    ],
})
export class AppModule {}
