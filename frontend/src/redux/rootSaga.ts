import { all } from "redux-saga/effects";
import { loginWatcher } from "./ducks/auth/sagas";

export function* rootSaga() {
    yield  all([
        loginWatcher()
    ])
}
