import { RoleDto } from "../../../types/role/role.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateRoleDto } from "../../../types/role/createRole.dto";

interface RoleState {
	roles: RoleDto[] | null;
	currentRole: RoleDto | null;
	loading: boolean;
	error: any;
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
		rolesSuccess(state, action: PayloadAction<RoleDto[]>) {
			state.loading = false;
			state.roles = action.payload;
		},
		rolesFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		},
		fetchedRole(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		roleSuccess(state, action: PayloadAction<RoleDto>) {
			state.loading = false;
			state.currentRole = action.payload;
		},
		fetchedCreate(state, action: PayloadAction<CreateRoleDto>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<RoleDto[]>) {
			state.loading = false;
			state.roles = action.payload;
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
} = roleSlice.actions;

export const roleReducer = roleSlice.reducer;
