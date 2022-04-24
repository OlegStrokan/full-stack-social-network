import { Column, DataType, HasMany, Model } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MessageModel } from "./message.model";

interface IConversationModel {
  firstUser: number;
  secondUser: number;
}

export class ConversationModel extends Model<ConversationModel, IConversationModel> {
  @ApiProperty({ example: "4", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "23", description: "First user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  firstUser: number;

  @ApiProperty({ example: "93", description: "Second user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  secondUser: number;

  @ApiProperty({ example: [MessageModel], description: "Messages for current conversation" })
  @HasMany(() => MessageModel)
  messages: MessageModel[];
}
