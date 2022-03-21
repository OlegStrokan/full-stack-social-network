import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";
import { MessageModel } from "./message.model";
import { UserConversationModel } from "./user-conversation.model";

interface ConversationCreationAttr {
  userId: number;
  users: UserModel[];
}

@Table({ tableName: "conversations" })
export class ConversationModel extends Model<ConversationModel, ConversationCreationAttr> {
  @ApiProperty({ example: "92", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @BelongsToMany(() => UserModel, () => UserConversationModel)
  users: UserModel[];

  @HasMany(() => MessageModel)
  messages: MessageModel[];
}
