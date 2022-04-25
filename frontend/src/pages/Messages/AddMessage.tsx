import React from "react";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Socket } from "socket.io-client";

interface IAddMessageForm {
	socket: Socket | null;
	userId: number | null;
	conversationId: number;
}

export const AddMessageForm: React.FC<IAddMessageForm> = ({ socket, userId, conversationId }) => {

	const [message, setMessage] = React.useState('');

	const onSubmit = () => {
		socket?.emit('sendMessage', {  text: message, senderId: userId, conversationId: conversationId })
		setMessage('');
	}

	return <Grid>
			<TextField
				required
				fullWidth
				id="message"
				label="Message"
				autoComplete="Message"
				value={message}
				onChange={(e) => setMessage(e.currentTarget.value)}
			/>
		<Button onClick={() => onSubmit()} variant="contained">Send</Button>
	</Grid>
}
