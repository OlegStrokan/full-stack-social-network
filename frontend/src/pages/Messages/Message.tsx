import React from "react";
import { MessageDto } from "../../types/message/message.dto";
import { Grid } from "@mui/material";

interface MessageInterface {
	message: MessageDto
}

export const Message:React.FC<MessageInterface> = ({ message }) => {

	return (
		<Grid>
			{message.message}
		</Grid>
	);
};
