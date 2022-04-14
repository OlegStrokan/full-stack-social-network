import React from "react";
import { Grid } from "@mui/material";
import { Messages } from "./Messages";
import { AddMessageForm } from "./AddMessage";
import { Socket } from "socket.io-client";

interface IConversation {
	socket: Socket | null;
	userId: number | null;
}

export const Conversation: React.FC<IConversation> = ({ socket, userId }) => {


	React.useEffect(() => {
		socket?.emit('joinConversation', { friendId: 3})
	})

	return (
		<Grid>
			<Messages socket={socket} />
			<AddMessageForm socket={socket} userId={userId} />
		</Grid>
	);
};
