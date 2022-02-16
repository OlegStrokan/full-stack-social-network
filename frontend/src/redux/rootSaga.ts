import { all } from "redux-saga/effects";
import { authWatcher } from "./ducks/auth/saga";
import { profileWatcher } from "./ducks/profile/saga";
import { postWatcher } from "./ducks/post/saga";
import { userWatcher } from "./ducks/user/saga";
import { roleWatcher } from "./ducks/role/saga";

export function* rootSaga() {
	yield  all([
		authWatcher(),
		profileWatcher(),
		postWatcher(),
		userWatcher(),
		roleWatcher(),
	]);
}
