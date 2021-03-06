import {
	IFetchedAddRole,
	IFetchedBan,
	IFetchedCreate,
	IFetchedUnban,
} from "./action.types";
import { call, put, takeEvery } from "redux-saga/effects";
import { userAPI } from "../../../api/user.api";
import { usersFailed, usersSuccess } from "./user.slice";
import { ProfileDto } from "../../../types/profile/profile.dto";

function* getUsers() {
	try {
		const data: ProfileDto[] = yield call(userAPI.getUsers);
		yield put(usersSuccess(data));
	} catch (error: any) {
		yield put(usersFailed(error));
	}
}

function* createUser({ payload }: IFetchedCreate) {
	try {
		const data: ProfileDto[] = yield call(userAPI.createUser, payload);
		yield put(usersSuccess(data));
	} catch (error: any) {
		yield put(usersFailed(error));
	}
}

function* addRole({ payload }: IFetchedAddRole) {
	try {
		const data: ProfileDto[] = yield call(userAPI.addRole, payload);
		yield put(usersSuccess(data));
	} catch (error: any) {
		yield put(usersFailed(error));
	}
}

function* banUser({ payload }: IFetchedBan) {
	try {
		const data: ProfileDto[] = yield call(userAPI.banUser, payload);
		yield put(usersSuccess(data));
	} catch (error: any) {
		yield put(usersFailed(error));
	}
}

function* unbanUser({ payload }: IFetchedUnban) {
	try {
		const data: ProfileDto[] = yield call(userAPI.unbanUser, payload);
		yield put(usersSuccess(data));
	} catch (error: any) {
		yield put(usersFailed(error));
	}
}

export function* userWatcher() {
	yield takeEvery("user/fetchedUsers", getUsers);
	yield takeEvery("user/fetchedCreate", createUser);
	yield takeEvery("user/fetchedAddRole", addRole);
	yield takeEvery("user/fetchedBanUser", banUser);
	yield takeEvery("user/fetchedUnbanUser", unbanUser);
}
