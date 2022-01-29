import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'blocked_users' })
export class BlockedUserModel extends Model<BlockedUserModel> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    blocker_id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    blocked_id: number;
}
