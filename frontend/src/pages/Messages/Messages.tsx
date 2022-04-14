import React from "react";
import { MessageDto } from "../../types/message/message.dto";
import { Message } from "./Message";
import { Socket } from "socket.io-client";

export const Messages: React.FC<{socket: Socket | null}> = ({ socket  }) => {

	const [messages, setMessages] = React.useState<MessageDto[]>([]);

	React.useEffect(() => {

	},[])
	return <div style={{height: '400px', overflowY: 'auto'}}>
		{messages.map((m, index) => <Message key={index} message={m}/>)}

	</div>
}
