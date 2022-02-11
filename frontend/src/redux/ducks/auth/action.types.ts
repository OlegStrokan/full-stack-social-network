import { Action } from "@reduxjs/toolkit";
import { LoginDto } from "../../../types/auth/login.dto";


export enum AuthActionTypes {
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    FETCHED_AUTH = 'FETCHED_AUTH',
}


export interface IAuthSuccess extends Action<AuthActionTypes>{
    type: AuthActionTypes.AUTH_SUCCESS,
    token: string
}
export interface IAuthFailed extends Action<AuthActionTypes>{
    type: AuthActionTypes.AUTH_FAILED,
    error: any
}
export interface IFetchedAuth extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_AUTH,
    payload: LoginDto
}


