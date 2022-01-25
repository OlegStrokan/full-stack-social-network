import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '../user/models/user.model';

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string | string[];
}


@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, PostCreationAttrs> {

   // @ApiProperty({ example: '1', description: 'id' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

  //  @ApiProperty({ example: 'This is title', description: 'Post\'s title' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string;

   // @ApiProperty({ example: 'This is some content', description: 'Post\'s content' })
    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

   // @ApiProperty({ example: '89as-d2as-348s-238a-we9w', description: 'Name of post\'s image' })
    @Column({ type: DataType.STRING })
    image: string | string[];

    @Column({ type: DataType.NUMBER, defaultValue: 0})
    likesCount: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER})
    userId: number

    /*@BelongsTo(() => UserModel)
    author: UserModel;*/
}
