import React from "react";
import { MessageDto } from "../../types/message/message.dto";

interface MessageInterface {
	message: MessageDto
}

export const Message:React.FC<MessageInterface> = ({ message }) => {

	return (
		<div>
			Message page
		</div>
	);
};
