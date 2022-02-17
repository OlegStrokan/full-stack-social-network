import { call, put, takeEvery } from "redux-saga/effects";
import { me } from "../auth/saga";
import { initializeFailed, initializeSuccess } from "./initialize.slice";

function* initializeApp() {
	try {
		yield call(me)
		yield put(initializeSuccess())
	} catch (error: any) {
		yield put(initializeFailed(error))
	}
}


export function* initializeWatcher() {
	yield takeEvery('initialize/fetchedInitialize', initializeApp)
}
