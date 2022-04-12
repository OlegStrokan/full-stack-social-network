import { put, takeEvery } from "redux-saga/effects";
import { initializeFailed } from "./message.slice";
import { IFetchedInit } from "./action.types";

export function* initSockets({ payload }: IFetchedInit ) {
	try {
		debugger;
		yield payload.on('conversation', (res) => {
			console.log(res);
		})
	} catch (error) {
		yield put(initializeFailed(error))
	}
}

export function* messageWatcher () {
	yield takeEvery('message/fetchedInit', initSockets)
}
