import { MessageDto } from "./message.dto";

export interface ConversationDto {
  id: number;
  messages?: MessageDto[]
}
