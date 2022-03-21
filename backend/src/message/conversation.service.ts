import { Injectable } from "@nestjs/common";
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
    /*  return this.conversationRepository.findOne({
      where: { users: { id: creatorId, friendId } },
    });*/
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
}
