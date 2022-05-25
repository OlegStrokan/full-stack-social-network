import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";

interface ConversationCreationAttr {
  firstUser: number;
  secondUser: number;
}

@Table({ tableName: "conversations", createdAt: false, updatedAt: false })
export class ConversationModel extends Model<ConversationModel, ConversationCreationAttr> {
  @ApiProperty({ example: "1", description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "1", description: "First user's id" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  firstUser: number;

  @ApiProperty({ example: "1", description: "Second user's id" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  secondUser: number;
}
