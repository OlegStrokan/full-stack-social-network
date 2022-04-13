import { Socket } from "socket.io-client";
import { MessageDto } from "./message.dto";


export interface ConversationDto {
  id: number;
  messages?: MessageDto[]
}

export interface CreateConversationDto {
  socket: Socket;
  friendId: number;
}

export interface JoinConversationDto extends CreateConversationDto {}
