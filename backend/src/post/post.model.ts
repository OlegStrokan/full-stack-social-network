import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../user/models/user.model";

interface PostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image?: string;
}

@Table({ tableName: "posts", createdAt: false, updatedAt: false })
export class PostModel extends Model<PostModel, PostCreationAttrs> {
  @ApiProperty({
    example: "1",
    description: "Post's id",
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: "This is title",
    description: "Post's title",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: "This is some content",
    description: "Post's content",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @ApiProperty({
    example: "89as-d2as-348s-238a-we9w",
    description: "Name of post's image",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  @ApiProperty({
    example: "21",
    description: "Likes count for current post",
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  likesCount: number;

  @ApiProperty({
    example: "2",
    description: "Author of current post",
  })
  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
