import React from "react";
import { Messages } from "./Messages/Messages";
import { AddMessageForm } from "./AddMessage/AddMessage";
import { useParams } from "react-router-dom";
import { MessageDto } from "../../types/message/message.dto";
import { Grid, Typography } from '@mui/material';
import { Socket } from 'socket.io-client';
// @ts-ignore
import styles from './MessagePage.module.css';

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
		<Grid className={styles.conversation}>
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
