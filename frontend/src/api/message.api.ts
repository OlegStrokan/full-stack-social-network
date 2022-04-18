import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
	transportOptions: {
		polling: {
			extraHeaders: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			}
		}
	}
});
















