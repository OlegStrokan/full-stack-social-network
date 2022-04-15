import React from "react";
import { UserConversationDto } from "../../types/message/conversation.dto";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";


interface IConversations {
	conversations: any[];
}

export const ConversationList: React.FC<IConversations> = ({ conversations }) => {
	return (
		<Grid>
			{conversations?.map((conversation: UserConversationDto) => {
				return <Link to={`/messages/${conversation.secondUser}`}>
					<Typography>{conversation.id}</Typography>
				</Link>;
			})}
		</Grid>
	);
};

;
