import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageGateway } from "./message.gateway";
import { AuthModule } from "../auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { MessageModel } from "./models/message.model";
import { ActiveConversationModel } from "./models/active_conversation.model";
import { ConversationModel } from "./models/conversation.model";

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([MessageModel, ConversationModel, ActiveConversationModel]),
  ],
  providers: [MessageService, MessageGateway],
  exports: [MessageService],
})
export class MessageModule {}
