import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AuthService } from "../auth/auth.service";
import { Server } from "socket.io";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { Inject } from "@nestjs/common";
import { ClientProxy, EventPattern } from "@nestjs/microservices";

@WebSocketGateway(8001, { cors: { origin: "*" } })
export class MessageGateway implements NestGateway {
  constructor(
    @Inject("chat-service") private readonly client: ClientProxy,
    private readonly authService: AuthService
  ) {}

  @WebSocketServer()
  server: Server;

  @EventPattern("handleConnection")
  async handleConnection() {}

  @EventPattern("getConversations")
  async getConversations() {}

  @EventPattern("sendMessage")
  @SubscribeMessage("sendMessage")
  async sendMessage() {}

  @EventPattern("createConversation")
  @SubscribeMessage("createConversation")
  async createConversation() {}

  @EventPattern("joinConversation")
  @SubscribeMessage("joinConversation")
  async joinConversation() {}

  @EventPattern("leaveConversation")
  @SubscribeMessage("leaveConversation")
  async leaveConversation() {}

  @EventPattern("handleDisconnect")
  handleDisconnect() {}
}
