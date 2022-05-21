import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AuthService } from "../auth/auth.service";
import { Server } from "socket.io";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@WebSocketGateway(8001, { cors: { origin: "*" } })
export class MessageGateway implements NestGateway {
  constructor(
    @Inject("chat-service") private readonly client: ClientProxy,
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection() {}
  async getConversations() {}

  @SubscribeMessage("sendMessage")
  async sendMessage() {}

  @SubscribeMessage("createConversation")
  async createConversation() {}

  @SubscribeMessage("joinConversation")
  async joinConversation() {}

  @SubscribeMessage("leaveConversation")
  async leaveConversation() {}

  handleDisconnect() {}
}
