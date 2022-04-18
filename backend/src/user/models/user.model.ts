import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { UserRolesModel } from "../../role/models/user-roles.model";
import { RoleModel } from "../../role/models/role.model";
import { BlockedUserModel } from "./blocked-user.model";
import { PostModel } from "../../post/models/post.model";
import { PhotoModel } from "./photo.model";
import { ConversationModel } from "../../message/models/conversation.model";
import { MessageModel } from "../../message/models/message.model";
import { UserConversationModel } from "../../message/models/user-conversation.model";

interface UserCreationAttr {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

@Table({ tableName: "users" })
export class UserModel extends Model<UserModel, UserCreationAttr> {
  @ApiProperty({ example: "21", description: "Unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "user@gmail.com", description: "Email address" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: "258120", description: "Password" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "stroka01", description: "User name" })
  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @ApiProperty({ example: "Oleh Strokan", description: "Full name" })
  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @ApiProperty({
    example: "http://localhost:5000/290jrf-8203d9i-23jd8923j",
    description: "Activation link",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  activationLink: string;

  @ApiProperty({ example: "true", description: "Activated email or not" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  activated: boolean;

  @ApiProperty({
    example: "02934u203r9j",
    description: "Code",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  verificationCode: string;

  @ApiProperty({ example: "true", description: "Banned or not" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @ApiProperty({
    example: "Reason for blocking",
    description: "Reason for blocking",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  @ApiProperty({ example: "Simply clever", description: "Status" })
  @Column({ type: DataType.STRING, allowNull: true })
  status: string;

  @ApiProperty({
    example: "Madison Square 5",
    description: "Location",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  location: string;

  @ApiProperty({
    example: "Programmer",
    description: "Current job",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  job: string;

  @ApiProperty({
    example: "02.11.2001",
    description: "Date of birth",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  birth: string;

  @ApiProperty({
    example: "I am Oleh Strokan...",
    description: "Description about yourself",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  about: string;

  @ApiProperty({
    example: "Contribution to open source",
    description: "Interests",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  interests: string;

  @ApiProperty({
    example: "w98432hrdw9epj328e21ed-0",
    description: "User's avatar link",
  })
  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @HasMany(() => BlockedUserModel)
  blockedUsers: BlockedUserModel[];

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: RoleModel[];

  @HasMany(() => PostModel)
  posts: PostModel[];

  @HasMany(() => PhotoModel)
  photos: PhotoModel[];

  @BelongsToMany(() => ConversationModel, () => UserConversationModel)
  conversations: ConversationModel[];

  @HasMany(() => MessageModel)
  messages: MessageModel[];

  /*@HasMany(() => CommentModel)
  comments: CommentModel[]*/
}
