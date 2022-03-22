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
import { UserModel } from "../user/models/user.model";
import { MessageModel } from "./models/message.model";

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
      return this.handleDisconnect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log("HANDLE DISCONNECT");
    return this.conversationService.leaveConversation(socket.id);
  }

  getConversations(socket: Socket, userId: number) {
    const conversations = this.conversationService.getConversationsWithUsers(userId);
    return this.server.to(socket.id).emit("conversations", conversations);
  }

  @SubscribeMessage("sendMessage")
  async handleMessage(socket: Socket, newMessage: MessageModel) {
    if (!newMessage.conversation) {
      throw new HttpException(`No conversation exists for this users`, HttpStatus.NOT_FOUND);
    }
    const { user } = socket.data;
    newMessage.user = user;

    if (newMessage.conversation.id) {
      await this.conversationService.createMessage(newMessage.message);
      const activeUsers = await this.conversationService.getActiveUsers(
        newMessage.conversation.id
      );
      activeUsers.map((user) => this.server.to(user.socketId).emit("newMessage", newMessage));
    }
  }

  @SubscribeMessage("createConversation")
  async createConversation(socket: Socket, friend: UserModel) {
    await this.conversationService.createConversation(socket.data.user, friend);
    return this.getConversations(socket, socket.data.user.id);
  }

  @SubscribeMessage("joinConversation")
  async joinConversation(socket: Socket, friendId: number) {
    const conversation = await this.conversationService.joinConversation(
      friendId,
      socket.data.user.id,
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
