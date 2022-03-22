import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { MessageModel } from "./models/message.model";
import { ActiveConversationModel } from "./models/active-conversation";
import { UserConversationModel } from "./models/user-conversation.model";
import { Op } from "sequelize";
import { UserModel } from "../user/models/user.model";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel)
    private conversationRepository: typeof ConversationModel,
    @InjectModel(MessageModel)
    private messageRepository: typeof MessageModel,
    @InjectModel(ActiveConversationModel)
    private activateConversationRepository: typeof ActiveConversationModel,
    @InjectModel(UserConversationModel)
    private userConversationRepository: typeof UserConversationModel
  ) {}

  async getConversation(creatorId: number, friendId: number) {
    return await this.conversationRepository.findOne({
      where: {
        [Op.or]: [{ users: { id: creatorId } }, { users: { id: friendId } }],
      },
    });
  }

  async createConversation(creator: UserModel, friend: UserModel) {
    const conversation = await this.getConversation(creator.id, friend.id);

    if (!conversation) {
      const conversation = await this.conversationRepository.create({
        users: [creator, friend],
      });
      await conversation.save();
    }

    return conversation;
  }

  async getConversationsForUser(userId: number) {
    return await this.conversationRepository.findAll({ where: { users: { id: userId } } });
  }

  async getUsersInConversation(conversationId: number) {
    return await this.conversationRepository.findAll({
      where: { id: conversationId },
      include: { all: true },
    });
  }

  async getConversationsWithUsers(userId: number) {
    const conversations = await this.getConversationsForUser(userId);
    let users = [];
    conversations.map((conversation) => {
      users = [...users, this.getUsersInConversation(conversation.id)];
    });
  }

  async joinConversation(friendId: number, userId: number, socketId: string) {
    const conversation = await this.getConversation(userId, friendId);

    if (!conversation) {
      throw new HttpException(`No conversation exists for this users`, HttpStatus.NOT_FOUND);
    }

    const activeConversation = await this.activateConversationRepository.findOne({
      where: { userId },
    });
    if (activeConversation) {
      await this.activateConversationRepository.destroy({
        where: { id: userId },
      });
    }

    return await this.activateConversationRepository.create({
      userId,
      conversationId: conversation.id,
      socketId,
    });
  }

  async leaveConversation(socketId: string) {
    return await this.activateConversationRepository.destroy({
      where: { socketId },
    });
  }

  async getActiveUsers(conversationId: number) {
    return await this.activateConversationRepository.findAll({
      where: { conversationId },
    });
  }

  async createMessage(message: string) {
    return await this.messageRepository.create({ message: message });
  }

  async getMessages(conversationId: number) {
    return await this.messageRepository.findAll({
      where: { conversation: { id: conversationId } },
    });
  }

  // only helper methods. Would remove below in production

  async removeActiveConversations() {
    return await this.activateConversationRepository.destroy({
      where: {},
      truncate: true,
    });
  }

  async removeMessages() {
    return await this.messageRepository.destroy({
      where: {},
      truncate: true,
    });
  }

  async removeConversations() {
    return await this.conversationRepository.destroy({
      where: {},
      truncate: true,
    });
  }
}
