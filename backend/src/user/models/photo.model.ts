import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "./user.model";

interface PhotoCreationAttr {
  userId: number;
  url: string;
}

@Table({ tableName: "photos" })
export class PhotoModel extends Model<PhotoModel, PhotoCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @ApiProperty({ example: "5", description: "Owner this photo/video" })
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({
    example: "ewoh90823-2f23f4c-24f4ew-18hdf",
    description: "Url for open this video/photo",
  })
  @Column({ type: DataType.STRING })
  url: string;
}