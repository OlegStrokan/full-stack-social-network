import { call, put, takeEvery } from "redux-saga/effects";
import { authAPI, ILoginResponse } from "../../../api/auth.api";
import { IFetchedAuth } from "./action.types";
import { authFailed, authSuccess } from "./auth.slice";

export function* login({ payload}: IFetchedAuth) {
    try {
        // @ts-ignore
        const { token }: ILoginResponse = yield call(authAPI.login, payload);
        yield put(authSuccess(token));
    } catch (error: any) {
        yield put(authFailed(error))
    }

}

export function* loginWatcher () {
    // @ts-ignore
    yield takeEvery('auth/fetchedAuth', login)
}
