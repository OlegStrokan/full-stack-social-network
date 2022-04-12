import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { HttpException, HttpStatus, OnModuleInit } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { ConversationService } from "./conversation.service";
import { MessageModel } from "./models/message.model";

@WebSocketGateway(8001, { cors: { origin: "*" } })
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
    console.log(socket.handshake.headers);
    const jwt = socket.handshake.headers.authorization || null;
    const user = await this.authService.me(jwt);
    if (user.statusCode === 200) {
      socket.data.user = user.data;
      await this.getConversations(socket, user.data.id);
    } else {
      return this.handleDisconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    console.log("HANDLE DISCONNECT");
    return await this.conversationService.leaveConversation(socket.id);
  }

  async getConversations(socket: Socket, userId: number) {
    const conversations = await this.conversationService.getConversationsWithUsers(userId);
    return this.server.to(socket.id).emit("conversations", conversations);
  }

  @SubscribeMessage("getConversations")
  async getConversation() {
    return await this.conversationService.getConversations();
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(socket: Socket, newMessage: MessageModel) {
    if (!newMessage.conversationId) {
      throw new HttpException(`No conversation exists for this users`, HttpStatus.NOT_FOUND);
    }
    const { user } = socket.data;
    newMessage.user = user;

    if (newMessage.conversationId) {
      await this.conversationService.createMessage(newMessage);
      const activeUsers = await this.conversationService.getActiveUsers(
        newMessage.conversationId
      );
      activeUsers.map((user) => this.server.to(user.socketId).emit("newMessage", newMessage));
    }
  }

  @SubscribeMessage("createConversation")
  async createConversation(socket: Socket, dto: { friendId: number }) {
    await this.conversationService.createConversation(socket.data.user.id, dto.friendId);
    return this.getConversations(socket, socket.data.user.id);
  }

  @SubscribeMessage("joinConversation")
  async joinConversation(socket: Socket, dto: { friendId: number }) {
    const conversation = await this.conversationService.joinConversation(
      socket.data.user.id,
      dto.friendId,
      socket.id
    );
    const messages = await this.conversationService.getMessages(conversation.conversationId);
    return this.server.to(socket.id).emit("messages", messages);
  }

  @SubscribeMessage("leaveConversation")
  leaveConversation(socket: Socket) {
    return this.conversationService.leaveConversation(socket.id);
  }
}
