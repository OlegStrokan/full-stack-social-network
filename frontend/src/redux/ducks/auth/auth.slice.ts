import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSuccess, IAuthFailed, IRequestAuth } from "./action.types";


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
        requestAuth(state, action: PayloadAction<IRequestAuth>) {
            state.loading = action.payload.loading
        },
        authSuccess(state, action: PayloadAction<IAuthSuccess>) {
            state.token = action.payload.token
        },
        authFailed(state, action: PayloadAction<IAuthFailed>) {
            state.error = action.payload.error
        }
    }
})


export const authReducer = authSlice.reducer
