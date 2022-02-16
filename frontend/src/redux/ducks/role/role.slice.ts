import { RoleDto } from "../../../types/role/role.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICreateSuccess, IFetchedCreate, IFetchedRole, IFetchedRoles, IRoleFailed, IRolesSuccess, IRoleSuccess } from "./action.types";

interface RoleState {
	roles: RoleDto[] | null,
	currentRole: RoleDto | null,
	loading: boolean,
	error: any,
}

const initialState: RoleState = {
	roles: null,
	currentRole: null,
	loading: false,
	error: null
};

const roleSlice = createSlice({
	name: "role",
	initialState,
	reducers: {
		fetchedRoles(state) {
			state.loading = true;
		},
		rolesSuccess(state, action: PayloadAction<IRolesSuccess>) {
			state.loading = false;
			state.roles = action.payload.payload;
		},
		rolesFailed(state, action: PayloadAction<IRoleFailed>) {
			state.loading = false;
			state.error = action.payload.error;
		},
		fetchedRole(state, action: PayloadAction<IFetchedRole>) {
			state.loading = true;
		},
		roleSuccess(state, action: PayloadAction<IRoleSuccess>) {
			state.loading = false;
			state.currentRole = action.payload.payload;
		},
		fetchedCreate(state, action: PayloadAction<IFetchedCreate>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<ICreateSuccess>) {
			state.loading = false;
			state.roles = action.payload.payload;
		}
	}
});

export const {
	fetchedRole,
	fetchedRoles,
	rolesFailed,
	fetchedCreate,
	rolesSuccess,
	roleSuccess,
	createSuccess
}  = roleSlice.actions

export const roleReducer = roleSlice.reducer
