import React from "react";
import { ConversationDto } from "../../types/message/conversation.dto";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";


interface IConversations {
	conversations: ConversationDto[];
}

export const ConversationList: React.FC<IConversations> = ({ conversations }) => {
	return (
		<Grid>
			{conversations.map((conversation) => {
				return <Link to={`/${conversation.id}`}>
					<Typography>{conversation.id}</Typography>
				</Link>;
			})}
		</Grid>
	);
};

;
