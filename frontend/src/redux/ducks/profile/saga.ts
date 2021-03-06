import { profileAPI } from "../../../api/profile.api";
import { call, put, takeEvery } from "redux-saga/effects";
import {
	IFetchedActivate,
	IFetchedAvatar, IFetchedFollow, IFetchedProfile,
	IFetchedStatus, IFetchedUnfollow, IFetchedUpdate

} from "./action.types";
import {
	activateSuccess,
	avatarSuccess,
	followSuccess,
	profileFailed,
	profileSuccess,
	statusSuccess,
	unfollowSuccess
} from "./profile.slice";
import { ProfileDto } from "../../../types/profile/profile.dto";
import { IApiOkResponse } from "../../../api/instance.api";

function* getProfile({ payload }: IFetchedProfile) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.getProfile, payload);
		yield put(profileSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* update({ payload }: IFetchedUpdate) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.update, payload);
		yield put(statusSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* updateStatus({ payload }: IFetchedStatus) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.updateStatus, payload);
		yield put(statusSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* updateAvatar({ payload }: IFetchedAvatar) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.updateAvatar, payload);
		yield put(avatarSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* follow({ payload }: IFetchedFollow) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.follow, payload);
		yield put(followSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* unfollow({ payload }: IFetchedUnfollow) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.unfollow, payload);
		yield put(unfollowSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}

function* activate({ payload }: IFetchedActivate) {
	try {
		const { data }: IApiOkResponse<ProfileDto> = yield call(profileAPI.activate, payload);
		yield put(activateSuccess(data));
	} catch (error: any) {
		yield put(profileFailed(error));
	}
}


export function* profileWatcher() {
	yield takeEvery("profile/fetchedProfile", getProfile);
	yield takeEvery("profile/fetchedStatus", updateStatus);
	yield takeEvery("profile/fetchedAvatar", updateAvatar);
	yield takeEvery("profile/fetchedUpdate", update);
	yield takeEvery("profile/fetchedFollow", follow);
	yield takeEvery("profile/fetchedUnfollow", unfollow);
	yield takeEvery("profile/fetchedActivate", activate);
}
