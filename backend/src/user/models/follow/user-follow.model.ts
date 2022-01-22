import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from '../user.model';
import { FollowModel } from './follow.model';

@Table({ tableName: 'users_follows' })
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
