import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { OnModuleInit } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { ConversationService } from "./conversation.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(
    private authService: AuthService,
    private conversationService: ConversationService
  ) {}

  @WebSocketServer()
  server: Server;

  async onModuleInit() {}

  async handleConnection(socket: Socket) {
    console.log("HANDLE CONNECTION");
    const jwt = socket.handshake.headers.authorization || null;
    const user = await this.authService.me(jwt);
    if (user.statusCode === 200) {
      socket.data.user = user.data;
      return this.server
        .to(socket.id)
        .emit("conversations", this.getConversations(socket.data.user.id));
    } else {
      return null;
    }
  }

  async getConversations(userId: number) {
    return await this.conversationService.getConversations(userId);
  }

  async leaveConversation(socketId: string) {
    return this.conversationService.leaveConversation(socketId);
  }
  handleDisconnect(socket: Socket) {
    return this.leaveConversation(socket.id);
  }
}
