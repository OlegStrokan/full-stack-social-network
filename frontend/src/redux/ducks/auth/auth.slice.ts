import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSuccess, IAuthFailed } from "./action.types";


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
        fetchedAuth(state) {
            state.loading = true
        },
        authSuccess(state, action: PayloadAction<IAuthSuccess>) {
            state.loading = false
            state.token = action.payload.token
        },
        authFailed(state, action: PayloadAction<IAuthFailed>) {
            state.loading = false
            state.error = action.payload.error
        }
    }
})

export const { fetchedAuth, authSuccess, authFailed } = authSlice.actions
export const authReducer = authSlice.reducer
