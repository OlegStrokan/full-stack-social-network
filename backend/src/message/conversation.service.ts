import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Socket } from "socket.io";
import { MessageModel } from "./models/message.model";
import { InjectModel } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { ActiveConversationModel } from "./models/active-conversation";
import { Op } from "sequelize";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel)
    private conversationModel: typeof ConversationModel,
    @InjectModel(ConversationModel)
    private activeConversationModel: typeof ActiveConversationModel,
    @InjectModel(ConversationModel)
    private messageModel: typeof MessageModel
  ) {}

  async getConversations(userId: number) {
    const conversations = await this.conversationModel.findAll({
      where: {
        [Op.or]: [{ firstUser: userId }, { secondUser: userId }],
      },
    });
    if (!conversations) {
      throw new HttpException("No conversation For this user", HttpStatus.NOT_FOUND);
    }

    return conversations;
  }

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

    return conversation;
  }

  async joinConversation(socket: Socket, dto: { conversationId: number }) {
    const conversation = this.conversationModel.findOne({ where: { id: dto.conversationId } });

    if (!conversation) {
      throw new HttpException("Conversation not found", HttpStatus.NOT_FOUND);
    }
    return conversation;
  }

  async leaveConversation(socketId: string) {}
}
