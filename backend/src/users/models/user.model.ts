import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { FollowModel } from './follow/follow.model';
import { FollowerModel } from './follower/follower.model';

interface UserCreationAttr {
    email: string;
    username: string;
    fullname: string;
    password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttr> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'user@gmail.com', description: 'Email address' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string;

    @ApiProperty({ example: '258120', description: 'Password' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @ApiProperty({ example: 'stroka01', description: 'User name' })
    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @ApiProperty({ example: 'Oleh Strokan', description: 'Full name' })
    @Column({ type: DataType.STRING, allowNull: false })
    fullname: string;

    @ApiProperty({
        example: 'http://localhost:5000/290jrf-8203d9i-23jd8923j',
        description: 'Ссылка активации',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    activationLink: string;

    @ApiProperty({ example: 'true', description: 'Activated email or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActivated: boolean;

    @ApiProperty({ example: 'true', description: 'Banned or not' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean;

    @ApiProperty({
        example: 'Reason for blocking',
        description: 'Reason for blocking',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string;

    @ApiProperty({ example: 'Simply clever', description: 'Status' })
    @Column({ type: DataType.STRING, allowNull: true })
    status: string;

    @ApiProperty({
        example: 'Programmer',
        description: 'Information about user',
    })
    @Column({ type: DataType.STRING, allowNull: true })
    about: string;

    @HasMany(() => UserModel)
        // TODO - only id
    blocked_users: UserModel[];

    @HasMany(() => FollowerModel)
        // TODO - only id
    followers: FollowerModel[];

    @HasMany(() => FollowModel)
        // TODO - only id
    follows: FollowModel[];

    /*@HasMany(() => PostModel)
  posts: PostModel[]

  @HasMany(() => MediaModel)
  media: Media[]

  @HasMany(() => CommentModel)
  comments: CommentModel[]

  @BelongsToMany(() => Role, () => UserRoles)
  roles: PostModel[]*/
}
