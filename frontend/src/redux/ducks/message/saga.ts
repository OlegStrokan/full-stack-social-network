import { io, Socket } from "socket.io-client";
import { eventChannel } from "redux-saga";
import {
	fetchedCreateConversation,
	fetchedInitialize,
	fetchedJoinConversation,
	fetchedLeaveConversation
} from "./message.slice";

export const connect = () => {
	const socket = io('http://localhost:3000');
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
}
