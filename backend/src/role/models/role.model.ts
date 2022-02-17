import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles", createdAt: false, updatedAt: false  })
export class RoleModel extends Model<RoleModel, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
