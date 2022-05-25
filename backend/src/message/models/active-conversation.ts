import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface ActiveConversationCreationAttr {
  conversationId: number;
  socketId: string;
}

@Table({ tableName: "active_conversations", createdAt: false, updatedAt: false })
export class ActiveConversationModel extends Model<
  ActiveConversationModel,
  ActiveConversationCreationAttr
> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "1", description: "Conversation id" })
  @ForeignKey(() => ActiveConversationModel)
  @Column({ type: DataType.INTEGER })
  conversationId: number;

  @ApiProperty({ example: "5", description: "Socket's id" })
  @Column({ type: DataType.STRING })
  socketId: string;
}
