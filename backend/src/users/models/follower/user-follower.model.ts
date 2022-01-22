import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { FollowerModel } from './follower.model';
import { UserModel } from '../user.model';

@Table({ tableName: 'followers' })
export class UserFollowerModel extends Model<UserFollowerModel> {
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

    @ForeignKey(() => FollowerModel)
    @Column({ type: DataType.INTEGER })
    follower_id: number;
}
