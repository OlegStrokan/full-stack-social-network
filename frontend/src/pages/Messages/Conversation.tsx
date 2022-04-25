import React from "react";
import { Grid, Typography } from "@mui/material";
import { Messages } from "./Messages";
import { AddMessageForm } from "./AddMessage";
import { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import { MessageDto } from "../../types/message/message.dto";

interface IConversation {
	socket: Socket | null;
	userId: number | null;
}

export const Conversation: React.FC<IConversation> = ({ socket, userId }) => {

	const [messages, setMessages] = React.useState<MessageDto[]>([]);

	const params = useParams();
	React.useEffect(() => {
		if (!params.id) {
			return;
		}
		socket?.emit('joinConversation', {conversationId: Number(params.id)});
		socket?.on("messages", (data) => {
			setMessages((messages) => [...messages, ...data])
		});
		socket?.on("newMessage", (data) => {
			setMessages((messages) => [...messages, data])
		});
	},[params, socket, params.id])

	return (
		<Grid>
			{!params.id ? <Grid>
				<Typography>Start chat!</Typography>
			</Grid>
			:
			<Grid>
				<Messages socket={socket} messages={messages} userId={userId}/>
				<AddMessageForm socket={socket} userId={userId} conversationId={Number(params.id)} />
			</Grid>
			}

		</Grid>
	);
};
