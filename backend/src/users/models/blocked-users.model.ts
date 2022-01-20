import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UsersModel } from './users.model';


@Table({ tableName: 'blocked_users' })
export class BlockedUsersModel extends Model<BlockedUsersModel> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER})
  user_id: number

}
