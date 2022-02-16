import { call, put, takeEvery } from "redux-saga/effects";
import { authAPI, ILoginResponse } from "../../../api/auth.api";
import { IFetchedLogin, IFetchedRegistration } from "./action.types";
import { loginFailed, loginSuccess, registrationFailed, registrationSuccess } from "./auth.slice";

export function* registration({ payload }: IFetchedRegistration) {
    try {
        yield call(authAPI.registration, payload);
        yield put(registrationSuccess());
    } catch (error: any) {
        yield put(registrationFailed(error))
    }
}

export function* login({ payload }: IFetchedLogin) {
    try {
        const data: ILoginResponse = yield call(authAPI.login, payload);
        localStorage.saveItem('token', data.token)
        yield put(loginSuccess(data));
    } catch (error: any) {
        yield put(loginFailed(error))
    }
}

export function* authWatcher () {
    yield takeEvery('auth/fetchedRegistration', registration)
    yield takeEvery('auth/fetchedLogin', login)
}
