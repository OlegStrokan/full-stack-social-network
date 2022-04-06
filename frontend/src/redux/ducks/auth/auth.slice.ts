import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IMeResponse } from "../../../api/auth.api";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";
import { IRoleDto } from "../../../types/role/role.dto";

interface AuthState {
	userId: number | null;
	roles: IRoleDto[] | null;
	username: string | null;
	isAuth: boolean;
	loading: boolean;
	error: any;
	token: string | null;
	forgotPassword: {
		isSendedMail: boolean,
		isSetPassword: boolean,
	},
}

const initialState: AuthState = {
	userId: null,
	roles: null,
	username: null,
	isAuth: false,
	loading: false,
	error: null,
	token: null,
	forgotPassword: {
		isSendedMail: false,
		isSetPassword: false
	}
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		fetchedRegistration(state, action: PayloadAction<RegistrationDto>) {
			state.loading = true;
		},
		registrationSuccess(state, action: PayloadAction<void>) {
			state.loading = false;
		},
		fetchedLogin(state, action: PayloadAction<LoginDto>) {
			state.loading = true;
		},
		loginSuccess(state, action: PayloadAction<ILoginResponse>) {
			state.loading = false;
			state.isAuth = true;
			state.token = action.payload.token;
			state.userId = action.payload.id;
			state.roles = action.payload.roles;
		},
		fetchedLogout(state) {
			state.loading = true;
		},
		logoutSuccess(state) {
			state.loading = false;
			state.isAuth = false;
			state.token = null;
			state.userId = null;
		},
		fetchedMe(state) {
			state.loading = true;
		},
		meSuccess(state, action: PayloadAction<IMeResponse>) {
			state.loading = false;
			state.isAuth = true;
			state.userId = action.payload.data.id;
			state.username = action.payload.data.username;
			state.roles = action.payload.data.roles;

		},
		fetchedSendEmail(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		sendEmailSuccess(state) {
			state.loading = false;
			state.forgotPassword.isSendedMail = true;

		},
		fetchedSetPassword(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		setPasswordSuccess(state) {
			state.loading = false;
			state.forgotPassword.isSetPassword = true;

		},
		authFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const {
	fetchedLogin,
	loginSuccess,
	logoutSuccess,
	fetchedLogout,
	fetchedRegistration,
	registrationSuccess,
	meSuccess,
	authFailed,
	fetchedMe,
	fetchedSetPassword,
	fetchedSendEmail,
	sendEmailSuccess,
	setPasswordSuccess
} = authSlice.actions;

export const authReducer = authSlice.reducer;



















