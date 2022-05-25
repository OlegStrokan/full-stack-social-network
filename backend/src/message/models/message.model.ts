import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";

interface MessageCreationAttr {
  text: string;
  senderId: number;
}

@Table({ tableName: "messages" })
export class MessageModel extends Model<MessageModel, MessageCreationAttr> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "1", description: "Message text" })
  @Column({ type: DataType.STRING })
  text: string;

  @ApiProperty({ example: "1", description: "Sender user's id" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  senderId: number;

  @ApiProperty({ example: "false", description: "Message status" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isRead: boolean;

  @ApiProperty({ example: "false", description: "Parent message id (for reply)" })
  @ForeignKey(() => MessageModel)
  @Column({ type: DataType.BOOLEAN, defaultValue: null })
  parentId: number;
}
