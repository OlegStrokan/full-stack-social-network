import React from "react";
import { MessageDto } from "../../types/message/message.dto";
import { Message } from "./Message";

export const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {

	const [messages, setMessages] = React.useState<MessageDto[]>([]);

	React.useEffect(() => {
		const messageHandler = (e: MessageEvent) => {
			const newMessages = JSON.parse(e.data);
			setMessages((prevMessages) => [...prevMessages, ...newMessages])
		};
		wsChannel?.addEventListener('message', messageHandler)

		return () => wsChannel?.removeEventListener('message', messageHandler)

	},[wsChannel])
	return <div style={{height: '400px', overflowY: 'auto'}}>
		{messages.map((m, index) => <Message key={index} message={m}/>)}

	</div>
}
