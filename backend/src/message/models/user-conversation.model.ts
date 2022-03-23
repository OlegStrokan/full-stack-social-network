import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConversationModel } from "./conversation.model";
import { UserModel } from "../../user/models/user.model";

interface UserConversationCreationAttr {
  firstUser: number;
  secondUser: number;
}

@Table({ tableName: "user-conversations" })
export class UserConversationModel extends Model<
  UserConversationModel,
  UserConversationCreationAttr
> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "5", description: "User's id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  firstUser: number;

  @ApiProperty({ example: "5", description: "User's id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  secondUser: number;

  @ApiProperty({ example: "5", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: number;
}
