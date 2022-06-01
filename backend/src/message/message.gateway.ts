import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AuthService } from "../auth/auth.service";
import { ConversationService } from "./conversation.service";
import { Server, Socket } from "socket.io";
import { MessageModel } from "./models/message.model";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";
import { UserService } from "../user/user.service";

@WebSocketGateway(8001, { cors: { origin: "*" } })
export class MessageGateway implements NestGateway {
  constructor(
    private authService: AuthService,
    private conversationService: ConversationService,
    private userService: UserService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    console.log("HANDLE CONNECTION");
    const jwt = socket.handshake.headers.authorization || null;
    const user = await this.authService.me(jwt);
    if (user.statusCode === 200) {
      socket.data.user = user.data;
      return await this.getConversations(socket, socket.data.user.id);
    } else {
      return null;
    }
  }
  async getConversations(socket: Socket, userId: number) {
    return this.server
      .to(socket.id)
      .emit("conversations", await this.conversationService.getConversations(userId));
  }

  @SubscribeMessage("sendMessage")
  async sendMessage(socket: Socket, message: MessageModel) {}

  @SubscribeMessage("createConversation")
  async createConversation(socket: Socket, dto: { secondUser: number }) {
    return await this.conversationService.createConversation(
      Number(socket.data.user.id),
      dto.secondUser
    );
  }

  @SubscribeMessage("joinConversation")
  async joinConversation(socket: Socket, dto: { conversationId: number }) {}

  @SubscribeMessage("leaveConversation")
  async leaveConversation(socketId: string) {}

  handleDisconnect(socket: Socket) {
    console.log("HANDLE_DISCONNECTION");
  }
}
