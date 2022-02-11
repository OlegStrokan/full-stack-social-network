import { all } from "redux-saga/effects";
import { authWatcher } from "./ducks/auth/saga";

export function* rootSaga() {
    yield  all([
        authWatcher()
    ])
}
