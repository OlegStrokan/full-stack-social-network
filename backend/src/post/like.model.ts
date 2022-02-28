import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { PostModel } from "./post.model";

interface LikeCreationAttr {
  userId: number;
  postId: number;
}

@Table({ tableName: "likes", createdAt: false, updatedAt: false })
export class LikeModel extends Model<LikeModel, LikeCreationAttr> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "1", description: "User's id" })
  @ForeignKey(() => PostModel)
  userId: number;

  @ApiProperty({ example: "1", description: "Post's id" })
  @ForeignKey(() => PostModel)
  postId: number;
}
