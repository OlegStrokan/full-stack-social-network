import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { FollowModel } from './follow.model';
import { UserModel } from '../user.model';

@Table({ tableName: 'followers' })
export class UserFollowModel extends Model<UserFollowModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @ForeignKey(() => FollowModel)
  @Column({ type: DataType.INTEGER })
  follow_id: number;
}
