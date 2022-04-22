import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IMeResponse } from "../../../api/auth.api";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";
import { IRoleDto } from "../../../types/role/role.dto";
import { SetPasswordDto } from '../../../types/auth/set-password.dto';
import { VerifyCodeDto } from '../../../types/auth/verify-code.dto';

interface AuthState {
	userId: number | null;
	roles: IRoleDto[] | null;
	username: string | null;
	isAuth: boolean;
	loading: boolean;
	error: any;
	isRegister: boolean;
	token: string | null;
	forgotPassword: {
		isSendedMail: boolean,
		isVerifiedCode: boolean,
		isSetPassword: boolean,
	},
}

const initialState: AuthState = {
	userId: null,
	roles: null,
	username: null,
	isAuth: false,
	loading: false,
	isRegister: false,
	error: null,
	token: null,
	forgotPassword: {
		isSendedMail: false,
		isVerifiedCode: false,
		isSetPassword: false,
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
			state.isRegister = true;

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
			state.error = null;

		},
		fetchedVerifyCode(state, action: PayloadAction<VerifyCodeDto>) {
			state.loading = true;
		},
		verifyCodeSuccess(state) {
			state.loading = false;
			state.forgotPassword.isVerifiedCode = true;
			state.error = null;

		},
		fetchedSetPassword(state, action: PayloadAction<SetPasswordDto>) {
			state.loading = true;
		},
		setPasswordSuccess(state) {
			state.loading = false;
			state.forgotPassword.isSetPassword = true;
			state.error = null;

		},
		authFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload.response.data.message;
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
	setPasswordSuccess,
	verifyCodeSuccess,
	fetchedVerifyCode
} = authSlice.actions;

export const authReducer = authSlice.reducer;



















