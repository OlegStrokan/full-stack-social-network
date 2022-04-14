import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socket } from "../../api/message.api";
import { ConversationDto } from "../../types/message/conversation.dto";
import { Button } from "@mui/material";
import { Messages } from "./Messages";
import { AddMessageForm } from "./AddMessage";
import { Conversations } from "./Conversations";
import { MessageDto } from "../../types/message/message.dto";

interface MessagesPageInterface {
	isAuth: boolean;
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth }) => {

	const [conversations, setConversations] = React.useState<ConversationDto[]>([]);
	const [messages, setMessages] = React.useState<MessageDto[]>([]);

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		 socket.emit('joinConversation', { friendId: 3})
		// socket.emit('sendMessage', {  message: "Hello", userId: 1, conversationId: 3 })
		// socket.emit('createConversation', { friendId: 3})
		// socket.emit('leaveConversation')
		socket.on("conversations", (data) => {
			console.log(data);
			setConversations([...conversations, data]);
		});

		socket.on("messages", (data) => {
			console.log(data);
			setMessages([...messages, data]);
		});


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
			<Conversations conversations={conversations}/>
			<Messages socket={socket}/>
			<AddMessageForm socket={socket}/>
		</div>
	);
};
