import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConversationModel } from "./conversation.model";
import { UserModel } from "../../user/models/user.model";

interface IUserConversationModel {
  conversationId: number;
  firstUser: number;
  secondUser: number;
}

@Table({ tableName: "users_conversations", createdAt: false, updatedAt: false })
export class UserConversationModel extends Model<
  UserConversationModel,
  IUserConversationModel
> {
  @ApiProperty({ example: "4", description: "Message id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "93", description: "Conversation id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: number;

  @ApiProperty({ example: "23", description: "First user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => UserModel)
  firstUser: number;

  @ApiProperty({ example: "93", description: "Second user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => UserModel)
  secondUser: number;
}
