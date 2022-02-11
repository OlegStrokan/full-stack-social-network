import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchedLogin, IFetchedRegistration, ILoginFailed } from "./action.types";
import { ILoginResponse, ISuccessResponse } from "../../../api/auth.api";

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
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        fetchedLogin(state, action: PayloadAction<IFetchedLogin>) {
            state.loading = true
        },
        loginSuccess(state, action: PayloadAction<ILoginResponse>) {
            state.loading = false
            state.token = action.payload.token
        },
        loginFailed(state, action: PayloadAction<ILoginFailed>) {
            state.loading = false
            state.error = action.payload.error
        },
        fetchedRegistration(state, action: PayloadAction<IFetchedRegistration>) {
            state.loading = true
        },
        registrationSuccess(state, action: PayloadAction<void>) {
            state.loading = false
        },
        registrationFailed(state, action: PayloadAction<ILoginFailed>) {
            state.loading = false
            state.error = action.payload.error
        }
    }
})

export const { fetchedLogin, loginSuccess, loginFailed, fetchedRegistration, registrationSuccess, registrationFailed } = authSlice.actions
export const authReducer = authSlice.reducer
