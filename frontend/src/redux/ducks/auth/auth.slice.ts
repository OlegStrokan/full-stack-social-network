import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginResponse, IMeResponse } from "../../../api/auth.api";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";

interface AuthState {
    userId: number | null;
    isAuth: boolean;
    loading: boolean;
    error: any;
    token: string | null;
}

const initialState: AuthState = {
    userId: null,
    isAuth: false,
    loading: false,
    error: null,
    token: null
};

export const authSlice = createSlice({
    name: 'auth',
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
        },
        fetchedMe(state) {
            state.loading = true;
        },
        meSuccess(state, action: PayloadAction<IMeResponse>) {
            state.loading = false;
            state.isAuth = true
            state.userId = action.payload.id;
        },
        authFailed(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const {
    fetchedLogin,
    loginSuccess,
    fetchedRegistration,
    registrationSuccess,
    meSuccess,
    authFailed,
    fetchedMe
} = authSlice.actions;

export const authReducer = authSlice.reducer;



















