import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConversationModel } from "./conversation.model";

interface IActiveConversationModel {
  conversationId: number;
  socketId: string;
}

@Table({ tableName: "active_conversations", createdAt: false, updatedAt: false })
export class ActiveConversationModel extends Model<
  ActiveConversationModel,
  IActiveConversationModel
> {
  @ApiProperty({ example: "4", description: "Message id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "93", description: "Conversation id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: number;

  @ApiProperty({ example: "sojvw908f2hj39c", description: "Socket id" })
  @Column({ type: DataType.STRING })
  socketId: string;
}
