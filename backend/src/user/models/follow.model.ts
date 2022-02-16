import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserModel } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";

interface FollowAttrCreation {
  user_id: number;
  follower_id: number;
}

@Table({ tableName: "followers" })
export class FollowModel extends Model<FollowModel, FollowAttrCreation> {
  @ApiProperty({ example: "21", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "19", description: "User's identifier" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ApiProperty({ example: "32", description: "Follower's identifier" })
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  follower_id: number;
}
