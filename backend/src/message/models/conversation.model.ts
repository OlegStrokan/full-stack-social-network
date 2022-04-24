import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MessageModel } from "./message.model";
import { UserModel } from "../../user/models/user.model";

interface IConversationModel {
  firstUser: number;
  secondUser: number;
}

@Table({ tableName: "conversations", createdAt: false, updatedAt: false })
export class ConversationModel extends Model<ConversationModel, IConversationModel> {
  @ApiProperty({ example: "4", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "23", description: "First user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => UserModel)
  firstUser: number;

  @ApiProperty({ example: "93", description: "Second user's id" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => UserModel)
  secondUser: number;

  @ApiProperty({ example: [MessageModel], description: "Messages for current conversation" })
  @HasMany(() => MessageModel)
  messages: MessageModel[];
}
