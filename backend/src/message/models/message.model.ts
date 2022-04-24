import { Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConversationModel } from "./conversation.model";
import { UserModel } from "../../user/models/user.model";

interface IMessageModel {
  text: string;
  conversationId: number;
  senderId: number;
  receiverId: number;
}

export class MessageModel extends Model<MessageModel, IMessageModel> {
  @ApiProperty({ example: "4", description: "Message's id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "Hello!", description: "Message's text" })
  @Column({ type: DataType.STRING })
  text: number;

  @ApiProperty({ example: "false", description: "Message's status" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRead: number;

  @ApiProperty({ example: "93", description: "Conversation id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: number;

  @ApiProperty({ example: "93", description: "Sender id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  senderId: number;

  @ApiProperty({ example: "93", description: "Receiver id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  receiverId: number;
}
