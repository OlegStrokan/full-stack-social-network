import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserConversationDto } from "../../types/message/conversation.dto";
import { ConversationList } from "./ConversationList";
import { Conversation } from "./Conversation";
import { Grid } from "@mui/material";
import { io, Socket } from 'socket.io-client';

interface MessagesPageInterface {
	isAuth: boolean;
	userId: number | null,
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth, userId }) => {

	const [conversations, setConversations] = React.useState<UserConversationDto[]>([]);

	const socket = io("http://localhost:8001", {
		transportOptions: {
			polling: {
				extraHeaders: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}
		}})


	const navigate = useNavigate();

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		// socket.emit('createConversation', { friendId: 3})
		// socket.emit('leaveConversation')
		socket?.on("conversations", (data) => {
			setConversations([...conversations, ...data]);
		});


		return () => {
			setConversations([]);
			socket?.disconnect();
			socket?.off();
		}
	},[])



	return (
		<Grid>
			{conversations.length !== 0 &&
			<Grid>
              <ConversationList conversations={conversations}/>
              <Conversation userId={userId} socket={socket} />
			</Grid>}

		</Grid>
	);
};
