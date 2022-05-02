import React from "react";
import { MessageDto } from "../../../types/message/message.dto";
import { Grid } from "@mui/material";

interface MessageInterface {
	message: MessageDto;
	userId: number | null;
}

export const Message:React.FC<MessageInterface> = ({ message, userId }) => {

	return (
		<Grid>
			{message.senderId === userId && "Me: "}{message.text}
		</Grid>
	);
};
