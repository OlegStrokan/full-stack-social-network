import React from "react";
import { ConversationDto } from "../../types/message/conversation.dto";
import { Grid, Typography } from "@mui/material";


interface IConversations {
	conversations: ConversationDto[];
}
export const Conversations:React.FC<IConversations> = ({ conversations }) => {
	return (
		<Grid>
			{conversations.map((conversation) => {
				return <Grid>
					<Typography>{conversation.id}</Typography>
				</Grid>
			})}
		</Grid>
	);
};

