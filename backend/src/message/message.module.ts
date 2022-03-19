import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";

@Module({
  imports: [],
  providers: [MessageGateway],
})
export class MessageModule {}
