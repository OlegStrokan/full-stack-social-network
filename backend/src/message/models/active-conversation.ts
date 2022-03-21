import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";
import { ConversationModel } from "./conversation.model";

interface ActiveConversationCreationAttr {
  userId: number;
  conversationId: number;
  socketId: string;
}

@Table({ tableName: "active-conversations" })
export class ActiveConversationModel extends Model<
  ActiveConversationModel,
  ActiveConversationCreationAttr
> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => UserModel)
  @ApiProperty({ example: "5", description: "User's id" })
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "5", description: "Socket's id" })
  @Column({ type: DataType.STRING })
  socketId: string;

  @ForeignKey(() => ConversationModel)
  @ApiProperty({ example: "5", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER })
  conversationId: number;
}
