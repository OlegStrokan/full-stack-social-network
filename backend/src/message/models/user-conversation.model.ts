import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ConversationModel } from "./conversation.model";
import { UserModel } from "../../user/models/user.model";

interface UserConversationCreationAttr {
  id: number;
}

@Table({ tableName: "user-conversation" })
export class UserConversationModel extends Model<
  UserConversationModel,
  UserConversationCreationAttr
> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "5", description: "User's id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => UserModel)
  userId: UserModel[];

  @ApiProperty({ example: "5", description: "Conversation's id" })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ConversationModel)
  conversationId: ConversationModel[];
}
