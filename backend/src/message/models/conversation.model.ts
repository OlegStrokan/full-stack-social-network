import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MessageModel } from "./message.model";

@Table({ tableName: "conversations", createdAt: false, updatedAt: false })
export class ConversationModel extends Model<ConversationModel> {
  @ApiProperty({ example: "4", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: [MessageModel], description: "Messages for current conversation" })
  @HasMany(() => MessageModel)
  messages: MessageModel[];
}
