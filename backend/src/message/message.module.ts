import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { ConversationService } from "./conversation.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { UserModel } from "../user/models/user.model";

@Module({
  imports: [AuthModule, SequelizeModule.forFeature([UserModel])],
  providers: [MessageGateway, ConversationService],
  exports: [ConversationService],
})
export class MessageModule {}
