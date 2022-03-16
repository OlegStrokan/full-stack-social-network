import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ namespace: "/alert" })
export class AlertGateway {
  @WebSocketServer() wss: Server;

  sendToAll(msg: string) {
    this.wss.emit("Alert to client", { type: "Alert", message: msg });
  }
}
