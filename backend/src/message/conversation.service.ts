import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ConversationModel } from "./models/conversation.model";
import { MessageModel } from "./models/message.model";
import { ActiveConversationModel } from "./models/active-conversation";
import { UserConversationModel } from "./models/user-conversation.model";
import { UserModel } from "../user/models/user.model";

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(ConversationModel)
    private conversationRepository: typeof ConversationModel,
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
    @InjectModel(MessageModel)
    private messageRepository: typeof MessageModel,
    @InjectModel(ActiveConversationModel)
    private activateConversationRepository: typeof ActiveConversationModel,
    @InjectModel(UserConversationModel)
    private userConversationRepository: typeof UserConversationModel
  ) {}

  async getConversation(creatorId: number, friendId: number) {
    return await this.userConversationRepository.findOne({
      where: { firstUser: creatorId || friendId, secondUser: creatorId || friendId },
    });
  }

  async getConversations() {
    return await this.conversationRepository.findAll({
      include: { all: true },
    });
  }

  async createConversation(creatorId: number, friendId: number) {
    const conversation = await this.getConversation(creatorId, friendId);
    if (!conversation) {
      const newConversation = await this.conversationRepository.create();
      await newConversation.save();
      const newUserConversation = await this.userConversationRepository.create({
        firstUser: creatorId,
        secondUser: friendId,
        conversationId: newConversation.id,
      });
      return await newUserConversation.save();
    }
    return conversation;
  }

  async getConversationsForUser(userId: number) {
    return await this.userRepository.findAll({
      where: { id: userId },
      include: [this.conversationRepository],
      attributes: ["id"],
    });
  }

  async getUsersInConversation(conversationId: number) {
    return await this.userConversationRepository.findAll({
      where: { conversationId },
      include: { all: true },
    });
  }

  async getConversationsWithUsers(userId: number) {
    console.log("userId", userId);
    const conversations = await this.getConversationsForUser(userId);
    console.log("conversationsWithUsers", conversations);
    let users = [];
    conversations.map(async (conversation) => {
      users = [...users, [...(await this.getUsersInConversation(conversation.id))]];
    });
    return users;
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
}
