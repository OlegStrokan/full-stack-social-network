import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { socket } from "../../api/message.api";
import { UserConversationDto } from "../../types/message/conversation.dto";
import { ConversationList } from "./ConversationList";
import { Conversation } from "./Conversation";
import { Grid } from "@mui/material";

interface MessagesPageInterface {
	isAuth: boolean;
	userId: number | null,
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth, userId }) => {

	const [conversations, setConversations] = React.useState<UserConversationDto[]>([]);

	React.useEffect(() => {
		if (!isAuth) {
			return navigate("/login");
		}
		// socket.emit('createConversation', { friendId: 3})
		// socket.emit('leaveConversation')
		socket.on("conversations", (data) => {
			console.log(data);
			setConversations([...conversations, ...data]);
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
		<Grid>
			{conversations.length !== 0 &&
			<Grid>
              <ConversationList conversations={conversations}/>
              <Conversation userId={userId} socket={socket} />
			</Grid>}

		</Grid>
	);
};
