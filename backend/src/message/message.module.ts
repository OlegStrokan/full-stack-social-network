import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { ConversationService } from "./conversation.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { MessageModel } from "./models/message.model";
import { UserConversationModel } from "./models/user-conversation.model";
import { ActiveConversationModel } from "./models/active-conversation";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      ConversationModel,
      MessageModel,
      UserConversationModel,
      ActiveConversationModel,
    ]),
  ],
  providers: [MessageGateway, ConversationService],
  exports: [ConversationService],
})
export class MessageModule {}
