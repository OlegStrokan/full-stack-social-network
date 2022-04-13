import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchedCreateConversation, fetchedInit } from "../../redux/ducks/message/message.slice";
import { socket } from "../../api/message.api";
import { Socket } from "socket.io-client";
import { ConversationDto } from "../../types/message/conversation.dto";
import { Button } from "@mui/material";

interface MessagesPageInterface {
	isAuth: boolean;
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth }) => {

	const [conversations, setConversations] = React.useState<ConversationDto[]>([]);



	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}

		//socket.emit('createConversation', { friendId: 2})
		socket.on("conversations", (data) => {
			console.log(data);
			setConversations([...conversations, data]);
		});
		// socket.emit('createConversation', {socket: socket, friendId: 2})
		return () => {
			setConversations([]);
			socket.disconnect();
			socket.off();
		}
	},[])



	const navigate = useNavigate();

	const dispatch = useDispatch();


	return (
		<div>
			<Button>Create conversation</Button>
		</div>
	);
};
