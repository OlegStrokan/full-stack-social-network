import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socket } from "../../api/message.api";
import { ConversationDto } from "../../types/message/conversation.dto";
import { ConversationList } from "./ConversationList";
import { Conversation } from "./Conversation";

interface MessagesPageInterface {
	isAuth: boolean;
	userId: number | null,
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth, userId }) => {

	const [conversations, setConversations] = React.useState<ConversationDto[]>([]);

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		// socket.emit('createConversation', { friendId: 3})
		// socket.emit('leaveConversation')
		socket.on("conversations", (data) => {
			console.log(data);
			setConversations([...conversations, data]);
		});

		/*socket.on("messages", (data) => {
			console.log(data);
			setMessages([...messages, data]);
		});*/


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
			<ConversationList conversations={conversations}/>
			<Conversation userId={userId} socket={socket} />

		</div>
	);
};
