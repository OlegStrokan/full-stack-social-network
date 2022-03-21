import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger, OnModuleInit } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { ConversationService } from "./conversation.service";

@WebSocketGateway({ cors: { origin: "http://localhost:3000" } })
export class MessageGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  constructor(
    private authService: AuthService,
    private conversationService: ConversationService
  ) {}

  @WebSocketServer()
  server: Server;

  async onModuleInit() {
    await this.conversationService.removeActiveConversations();
    await this.conversationService.removeMessages();
    await this.conversationService.removeConversations();
  }

  handleConnection(socket: Socket) {
    console.log("HANDLE CONNECTION");
    const jwt = socket.handshake.headers.authorization || null;
    const isAuth = this.authService.me(jwt);
    if (!isAuth) {
      this.handleDisconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log("HANDLE DISCONNECT");
    this.conversationService.leaveConversation(socket.id);
  }
}
