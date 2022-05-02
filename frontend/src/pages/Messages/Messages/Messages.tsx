import React from "react";
import { MessageDto } from "../../../types/message/message.dto";
import { Message } from "./Message";
import { Socket } from "socket.io-client";
import { Grid } from "@mui/material";


interface IMessage {
	socket: Socket | null;
	messages: MessageDto[];
	userId: number | null;
}

export const Messages: React.FC<IMessage> = ({ socket, messages, userId  }) => {


	return <Grid style={{height: '400px', overflowY: 'auto'}}>
		{messages.map((m, index) => <Message key={index} message={m} userId={userId}/>)}
	</Grid>
}
