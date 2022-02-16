import { ProfileDto } from "../../../types/profile/profile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IFetchedAddRole, IFetchedBan,
	IFetchedCreate, IFetchedUnban,
	IUsersFailed,
	IUsersSuccess
} from "./action.types";

interface UserState {
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
	name: "users",
	initialState,
	reducers: {
		fetchedUsers(state) {
			state.loading = true;
		},
		usersSuccess(state, action: PayloadAction<IUsersSuccess>) {
			state.loading = false;
			state.users = action.payload.payload;
		},
		usersFailed(state, action: PayloadAction<IUsersFailed>) {
			state.loading = false;
			state.error = action.payload.error;
		},
		fetchedCreate(state, action: PayloadAction<IFetchedCreate>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<IUsersSuccess>) {
			state.loading = false;
			state.users = action.payload.payload;
		},
		fetchedAddRole(state, action: PayloadAction<IFetchedAddRole>) {
			state.loading = false;
		},
		addRoleUsers(state, action: PayloadAction<IUsersSuccess>) {
			state.loading = true;
			state.users = action.payload.payload;
		},
		fetchedBanUser(state, action: PayloadAction<IFetchedBan>) {
			state.loading = true;
		},
		banUserSuccess(state, action: PayloadAction<IUsersSuccess>) {
			state.loading = false;
			state.users = action.payload.payload;
		},
		fetchedUnbanUser(state, action: PayloadAction<IFetchedUnban>) {
			state.loading = true;
		},
		unbanUserSuccess(state, action: PayloadAction<IUsersSuccess>) {
			state.loading = false;
			state.users = action.payload.payload;
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
