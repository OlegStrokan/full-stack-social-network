import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { ActiveConversationModel } from "./models/active_conversation.model";
import { MessageModel } from "./models/message.model";
import { Op } from "sequelize";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel)
    private conversationRepository: typeof ConversationModel,
    @InjectModel(ActiveConversationModel)
    private activeConversationRepository: typeof ActiveConversationModel,
    @InjectModel(MessageModel)
    private messageRepository: typeof MessageModel
  ) {}

  async getConversations(userId: number) {
    const conversations = await this.conversationRepository.findAll({
      where: {
        [Op.or]: [{ firstUser: userId }, { secondUser: userId }],
      },
    });

    if (!conversations) {
      throw new HttpException("No conversation For this user", HttpStatus.NOT_FOUND);
    }

    return conversations;
  }

  async getConversationWithUsers(firstUser: number, secondUser: number) {
    return await this.conversationRepository.findOne({
      where: {
        [Op.or]: [
          { firstUser: firstUser || secondUser },
          { secondUser: firstUser || secondUser },
        ],
      },
    });
  }

  async joinConversation(socketId: string, conversationId: number) {
    const conversation = this.conversationRepository.findOne({
      where: { id: conversationId },
    });
    if (!conversation) {
      throw new HttpException("No conversation For this user", HttpStatus.NOT_FOUND);
    }

    const activeConversation = await this.activeConversationRepository.findOne({
      where: { conversationId },
    });

    if (activeConversation) {
      await this.activeConversationRepository.destroy({ where: { conversationId } });
    }

    return await this.activeConversationRepository.create({ conversationId, socketId });
  }

  async getMessages(conversationId: number) {
    return await this.messageRepository.findAll({
      where: { conversationId },
    });
  }

  async getActiveUsers(conversationId: number) {
    return await this.activeConversationRepository.findAll({
      where: { conversationId },
    });
  }

  async sendMessage(socket, message: MessageModel) {
    const conversation = this.activeConversationRepository.findOne({
      where: { conversationId: message.conversationId },
    });

    if (!conversation) {
      throw new HttpException("No conversation For this user", HttpStatus.NOT_FOUND);
    }

    await this.messageRepository.create({
      text: message.text,
      conversationId: Number(message.conversationId),
      senderId: Number(socket.data.user.id),
    });
  }

  async createConversation(firstUser: number, secondUser: number) {
    const conversation = await this.getConversationWithUsers(firstUser, secondUser);

    if (conversation) {
      return conversation;
    }

    const newConversation = await this.conversationRepository.create({
      firstUser,
      secondUser,
    });
    await newConversation.save();
  }

  async leaveConversation(socketId: string) {
    return await this.activeConversationRepository.destroy({
      where: { socketId },
    });
  }
}
