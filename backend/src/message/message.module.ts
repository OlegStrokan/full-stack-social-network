import { Module } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { MessageModel } from "./models/message.model";
import { ActiveConversationModel } from "./models/active_conversation.model";
import { ConversationModel } from "./models/conversation.model";
import { MessageGateway } from "./message.gateway";

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([MessageModel, ConversationModel, ActiveConversationModel]),
  ],
  providers: [ConversationService, MessageGateway],
  exports: [ConversationService],
})
export class MessageModule {}
