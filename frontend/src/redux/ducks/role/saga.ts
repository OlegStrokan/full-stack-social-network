import { IFetchedCreate, IFetchedRole } from "./action.types";
import { call, put, takeEvery } from "redux-saga/effects";
import { roleAPI } from "../../../api/role.api";
import { createSuccess, rolesFailed, rolesSuccess, roleSuccess } from "./role.slice";
import { RoleDto } from "../../../types/role/role.dto";

function* getRoles() {
	try {
		const data: RoleDto[] = yield call(roleAPI.getRoles)
		yield put(rolesSuccess(data))
	}
	catch (error: any) {
		yield put(rolesFailed(error))
	}
}

function* getRole({ payload }: IFetchedRole) {
	try {
		const data: RoleDto = yield call(roleAPI.getRole, payload)
		yield put(roleSuccess(data))
	}
	catch (error: any) {
		yield put(rolesFailed(error))
	}
}

function* createRole({ payload }: IFetchedCreate) {
	try {
		const data: RoleDto[] = yield call(roleAPI.createRole, payload)
		yield put(createSuccess(data))
	}
	catch (error: any) {
		yield put(rolesFailed(error))
	}
}


export function* roleWatcher() {
	yield takeEvery('role/fetchedRoles', getRoles)
	yield takeEvery('role/fetchedRole', getRole)
	yield takeEvery('role/fetchedCreate', createRole)
}
