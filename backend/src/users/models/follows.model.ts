import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UsersModel } from './users.model';


@Table({ tableName: 'follows' })
export class FollowsModel extends Model<FollowsModel> {

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER})
  user_id: number

}
