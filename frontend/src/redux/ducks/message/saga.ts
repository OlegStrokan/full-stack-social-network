import { put} from "redux-saga/effects";
import { createConversationSuccess, initializeFailed} from "./message.slice";
import { IFetchedInit } from "./action.types";
import { io, Socket } from "socket.io-client";
import { eventChannel } from "redux-saga";


function connect(): Promise<Socket> {

	const socket = io("http://localhost:8001", {
		transportOptions: {
			polling: {
				extraHeaders: {
					"Authorization": `Bearer ${localStorage.getItem("token")}`
				}
			}
		}
	});
	return new Promise(resolve => {
		socket.on('connect', () => {
			resolve(socket);
		});
	});
}


function subscribe(socket: Socket) {
	return eventChannel(emit => {
		socket.on('createConversation', (data) => {
			emit(createConversationSuccess(data));
		});
		socket.on('disconnect', e => {
			// TODO: handle
		});
		return () => {};
	});
}

/*

function* read(socket: Socket) {
	const channel = yield call(subscribe, socket);
	while (true) {
		let action = yield take(channel);
		yield put(action);
	}
}

function* write(socket: Socket) {
	while (true) {
		const { payload } = yield take(sendMessageSuccess);
		socket.emit('sendMessage', payload);
	}
}

function* handleIO(socket: Socket) {
	yield fork(read, socket);
	yield fork(write, socket);
}

function* flow(): Generator<any> {
	while (true) {
		let { payload } = yield take(initializeSuccess);
		const socket: Socket = yield call(connect);
		socket.emit('login', { username: payload.username });

		const task = yield fork(handleIO, socket);

		let action = yield take(`${logout}`);
		yield cancel(task);
		socket.emit('logout');
	}
}

*/








export function* initSockets({ payload }: IFetchedInit) {
	try {
		yield payload.on("conversation", (res) => {
		});
	} catch (error) {
		yield put(initializeFailed(error));
	}
}

/*export function* createConversation({ payload }: IFetchedCreateConversation) {
	try {
		yield call(payload.socket.emit("createConversation", payload));
	} catch (error) {
		yield put(initializeFailed(error));
	}
}
export function* messageWatcher() {
	yield takeEvery("message/fetchedInit", initSockets);
	yield takeEvery("message/fetchedCreateConversation", createConversation);
}*/
