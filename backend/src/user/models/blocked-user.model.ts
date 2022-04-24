import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "blocked_users" })
export class BlockedUserModel extends Model<BlockedUserModel> {
  @ApiProperty({ example: "21", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "81", description: "Blocker's identifier" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  blockerId: number;

  @ApiProperty({ example: "34", description: "Blockade's identifier" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  blockedId: number;
}
