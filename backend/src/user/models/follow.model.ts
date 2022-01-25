import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

interface FollowAttrCreation {
    user_id: number;
    follower_id: number;
}


@Table({ tableName: 'followers' })
export class FollowModel extends Model<FollowModel, FollowAttrCreation> {

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    user_id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    follower_id: number;
}
