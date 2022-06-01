import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "../../user/models/user.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles", createdAt: false, updatedAt: false })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
  @ApiProperty({ example: "5", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "5", description: "Role's value" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: "5", description: "Role's description" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

}
