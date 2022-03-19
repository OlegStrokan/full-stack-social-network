import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";

interface MessageCreationAttr {
  userId: number;
}

@Table({ tableName: "active-conversations" })
export class ConversationModel extends Model<ConversationModel, MessageCreationAttr> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => UserModel)
  @ApiProperty({ example: "5", description: "User's id" })
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "5", description: "Socket's id" })
  @Column({ type: DataType.INTEGER })
  socketId: number;

  @ForeignKey(() => ConversationModel)
  @ApiProperty({ example: "5", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER })
  conversationId: number;
}
