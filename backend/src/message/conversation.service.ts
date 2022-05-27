import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { MessageModel } from "./models/message.model";
import { InjectModel } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { ActiveConversationModel } from "./models/active-conversation";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel) private conversationModel: typeof ConversationModel,
    @InjectModel(ConversationModel)
    private activeConversationModel: typeof ActiveConversationModel,
    @InjectModel(ConversationModel) private messageModel: typeof MessageModel
  ) {}

  async getConversations(socket: Socket, userId: number) {}

  async getConversation(firstUser: number, secondUser: number) {
    const conversation = await this.conversationModel.findOne({
      where: { firstUser, secondUser },
    });

    if (!conversation) {
      return await this.conversationModel.findOne({
        where: { firstUser: secondUser, secondUser: firstUser },
      });
    }

    return conversation;
  }

  async sendMessage(socket: Socket, message: MessageModel) {}

  async createConversation(firstUser: number, secondUser: number) {
    const conversation = this.getConversation(firstUser, secondUser);

    if (!conversation) return await this.conversationModel.create({ firstUser, secondUser });
  }

  async joinConversation(socket: Socket, dto: { conversationId: number }) {}

  async leaveConversation(socketId: string) {}
}
