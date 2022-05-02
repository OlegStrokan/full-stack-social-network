import { Socket } from 'socket.io-client';
import { MessageDto } from './message.dto';


export interface ConversationDto {
  id: number;
  firsUser: number;
  secondUser: number;
  messages?: MessageDto[];
}

export interface UserConversationDto {
  id: number;
  firstUser: number;
  secondUser: number;
  conversationId: number;
}

export interface CreateConversationDto {
  socket: Socket;
  secondUserId: number;
}

export interface JoinConversationDto extends CreateConversationDto {
}
