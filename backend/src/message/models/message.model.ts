import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";
import { ConversationModel } from "./conversation.model";

export interface MessageCreationAttr {
  message: string;
  userId: number;
  conversationId: number;
}

@Table({ tableName: "messages" })
export class MessageModel extends Model<MessageModel, MessageCreationAttr> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.STRING })
  message: string;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @ForeignKey(() => UserModel)
  userId: number;

  @BelongsTo(() => ConversationModel)
  conversation: ConversationModel;

  @ForeignKey(() => ConversationModel)
  conversationId: number;
}
