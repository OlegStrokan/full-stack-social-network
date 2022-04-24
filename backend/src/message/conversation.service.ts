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

  async leaveConversation(socketId: string) {
    const activeConversation = await this.activeConversationRepository.destroy({
      where: { socketId },
    });

    if (!activeConversation) {
      throw new HttpException("No conversation For this user", HttpStatus.NOT_FOUND);
    }

    return HttpStatus.OK;
  }
}
