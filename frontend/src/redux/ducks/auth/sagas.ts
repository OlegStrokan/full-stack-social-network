import { call, put, takeEvery } from "redux-saga/effects";
import { authAPI } from "../../../api/auth.api";
import { IFetchedAuth } from "./action.types";
import { authSlice } from "./auth.slice";

export function* login({ authData }: IFetchedAuth) {
    try {
        const { data } = yield call(authAPI.login, authData);
        yield put(authSlice.actions.authSuccess(data));
    } catch (error: any) {
        yield put(authSlice.actions.authFailed(error))
    }

}

export function* loginWatcher () {
    yield takeEvery('auth/fetchedAuth', login)
}
