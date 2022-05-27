import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { ConversationService } from "./conversation.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AuthModule } from "../auth/auth.module";
import { UserModel } from "../user/models/user.model";
import { UserModule } from "../user/user.module";
import { ConversationModel } from "./models/conversation.model";
import { ActiveConversationModel } from "./models/active-conversation";
import { MessageModel } from "./models/message.model";

@Module({
  imports: [
    AuthModule,
    UserModule,
    SequelizeModule.forFeature([
      UserModel,
      ConversationModel,
      ActiveConversationModel,
      MessageModel,
    ]),
  ],
  providers: [MessageGateway, ConversationService],
  exports: [ConversationService],
})
export class MessageModule {}
