import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

@WebSocketGateway({ namespace: "/message" })
export class MessageGateway implements OnGatewayInit {
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger("MessageGateway");

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  @SubscribeMessage("message to server")
  handleMessage(client: Socket, message: { sender: string; room: string; message: string }) {
    this.wss.to(message.room).emit("Message to client", message);
  }

  @SubscribeMessage("join chat")
  handleJoinChat(client: Socket, chat: string) {
    client.join(chat);
    client.emit("joined chat", chat);
  }

  @SubscribeMessage("leave chat")
  handleLeaveChat(client: Socket, chat: string) {
    client.leave(chat);
    client.emit("left chat", chat);
  }
}
