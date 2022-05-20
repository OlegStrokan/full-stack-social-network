import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { PostModel } from "./post.model";
import { UserModel } from "../../user/models/user.model";

interface DisLikeCreationAttr {
  userId: number;
  postId: number;
}

@Table({ tableName: "dislikes", createdAt: false, updatedAt: false })
export class DislikeModel extends Model<DislikeModel, DisLikeCreationAttr> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "1", description: "User's id" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "1", description: "Post's id" })
  @ForeignKey(() => PostModel)
  @Column({ type: DataType.INTEGER })
  postId: number;

  @ApiProperty({ example: "true", description: "Is disliked" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  isDisliked: boolean;

  @BelongsTo(() => PostModel)
  source: PostModel;
}
