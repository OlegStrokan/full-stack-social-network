import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from '../user.model';

@Table({ tableName: 'follows' })
export class FollowModel extends Model<FollowModel> {
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
}
