import { call, put, takeEvery } from "redux-saga/effects";
import { authAPI, ILoginResponse, IMeResponse } from "../../../api/auth.api";
import { IFetchedLogin, IFetchedRegistration, IFetchedSendEmail, IFetchedSetPassword } from "./action.types";
import {
	authFailed,
	fetchedSendEmail,
	loginSuccess,
	logoutSuccess,
	meSuccess,
	registrationSuccess, sendEmailSuccess, setPasswordSuccess
} from "./auth.slice";

export function* registration({ payload }: IFetchedRegistration) {
	try {
		yield call(authAPI.registration, payload);
		yield put(registrationSuccess());
	} catch (error: any) {
		yield put(authFailed(error));
	}
}

export function* login({ payload }: IFetchedLogin) {
	try {
		const data: ILoginResponse = yield call(authAPI.login, payload);
		localStorage.setItem("token", data.token);
		yield put(loginSuccess(data));
	} catch (error: any) {
		yield put(authFailed(error));
	}
}

export function* logout() {
	try {
		localStorage.removeItem("token");
		yield put(logoutSuccess());
	} catch (error: any) {
		yield put(authFailed(error));
	}
}

export function* me() {
	try {
		const data: IMeResponse = yield call(authAPI.me);
		yield put(meSuccess(data));
	} catch (error: any) {
		yield put(authFailed(error));
	}
}


export function* sendEmail({ payload }: IFetchedSendEmail) {
	try {
		yield call(authAPI.sendEmail, payload);
		yield put(sendEmailSuccess());
	} catch (error: any) {
		yield put(authFailed(error));
	}
}

export function* setPassword({ payload }: IFetchedSetPassword) {
	try {
		yield call(authAPI.setPassword, payload);
		yield put(setPasswordSuccess());
	} catch (error: any) {
		yield put(authFailed(error));
	}
}


export function* authWatcher() {
	yield takeEvery("auth/fetchedRegistration", registration);
	yield takeEvery("auth/fetchedLogin", login);
	yield takeEvery("auth/fetchedLogout", logout);
	yield takeEvery("auth/fetchedMe", me);
	yield takeEvery("auth/fetchedSendEmail", sendEmail);
	yield takeEvery("auth/fetchedNewPassword", setPassword);
}
