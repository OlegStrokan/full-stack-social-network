import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { AuthService } from "../auth/auth.service";
import { ConversationService } from "./conversation.service";
import { Server, Socket } from "socket.io";
import { MessageModel } from "./models/message.model";
import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface";

@WebSocketGateway(8001, { cors: { origin: "*" } })
export class MessageGateway implements NestGateway {
  constructor(
    private authService: AuthService,
    private conversationService: ConversationService
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
  async sendMessage(socket: Socket, message: MessageModel) {
    const newMessage = await this.conversationService.sendMessage(socket, message);

    const activeUsers = await this.conversationService.getActiveUsers(message.conversationId);

    activeUsers.map((user) => this.server.to(user.socketId).emit("newMessage", newMessage));
  }

  @SubscribeMessage("createConversation")
  async createConversation(socket: Socket, dto: { secondUser: number }) {
    await this.conversationService.createConversation(socket.data.user.id, dto.secondUser);
    return this.getConversations(socket, socket.data.user.id);
  }

  @SubscribeMessage("joinConversation")
  async joinConversation(socket: Socket, dto: { conversationId: number }) {
    console.log(socket.id, dto.conversationId);
    const activeConversation = await this.conversationService.joinConversation(
      socket.id,
      dto.conversationId
    );
    const messages = await this.conversationService.getMessages(
      activeConversation.conversationId
    );
    return this.server.to(socket.id).emit("messages", messages);
  }

  @SubscribeMessage("leaveConversation")
  async leaveConversation(socketId: string) {
    return this.conversationService.leaveConversation(socketId);
  }

  handleDisconnect(socket: Socket) {
    console.log("HANDLE_DISCONNECTION");
    return this.leaveConversation(socket.id);
  }
}
