import { ProfileDto } from "../../../types/profile/profile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BanUserDto } from "../../../types/user/banUser.dto";
import { AddRoleDto } from "../../../types/user/addRole.dto";
import { CreateUserDto } from "../../../types/user/createUser.dto";

export interface UserState {
	users: ProfileDto[] | null;
	loading: boolean;
	error: any;
}

const initialState: UserState = {
	users: null,
	loading: false,
	error: null
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		fetchedUsers(state) {
			state.loading = true;
		},
		usersSuccess(state, action: PayloadAction<ProfileDto[]>) {
			state.loading = false;
			state.users = action.payload;
		},
		usersFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload.response.data.message;
		},
		fetchedCreate(state, action: PayloadAction<CreateUserDto>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<ProfileDto[]>) {
			state.loading = false;
			state.users = action.payload;
		},
		fetchedAddRole(state, action: PayloadAction<AddRoleDto>) {
			state.loading = false;
		},
		addRoleUsers(state, action: PayloadAction<ProfileDto[]>) {
			state.loading = true;
			state.users = action.payload;
		},
		fetchedBanUser(state, action: PayloadAction<BanUserDto>) {
			state.loading = true;
		},
		banUserSuccess(state, action: PayloadAction<ProfileDto[]>) {
			state.loading = false;
			state.users = action.payload;
		},
		fetchedUnbanUser(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		unbanUserSuccess(state, action: PayloadAction<ProfileDto[]>) {
			state.loading = false;
			state.users = action.payload;
		}
	}
});

export const {
	banUserSuccess,
	unbanUserSuccess,
	fetchedUnbanUser,
	fetchedBanUser,
	fetchedUsers,
	fetchedCreate,
	addRoleUsers,
	fetchedAddRole,
	usersSuccess,
	usersFailed,
	createSuccess
} = userSlice.actions;

export const userReducer = userSlice.reducer;
