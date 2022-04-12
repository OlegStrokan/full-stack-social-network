import { MessageDto } from "../types/message/message.dto";
import { io, Socket } from "socket.io-client";

type SubscriberType = (messages: MessageDto[]) => void;

let subscribers = [] as SubscriberType[];
let socket: Socket;

const closeHandler = () => {
	console.log('CLOSE SOCKET');
	setTimeout(createChannel, 3000)
}

const createChannel = () => {
	console.log('OPEN SOCKET')
	socket?.off('close', closeHandler);
	socket?.close();
	socket = io('http://localhost:8001');
	socket.on('close', closeHandler);
}

const messageHandler = (e: MessageEvent) => {
	let newMessages = JSON.parse(e.data);
	subscribers.forEach((subscriber) => subscriber(newMessages));
}

export const MessageApi = {
	subscribe(callback: SubscriberType) {
		subscribers.push(callback);
		return () => {
			subscribers = subscribers.filter((subscriber) => subscriber !== callback)
		}
	},
	unsubscribe(callback: SubscriberType) {
		subscribers = subscribers.filter((subscriber) => subscriber !== callback)
	}


}
















