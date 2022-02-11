import { Action } from "@reduxjs/toolkit";
import { LoginDto } from "../../../types/auth/login.dto";


export enum HistoricalDataActionsTypes {
    REQUEST_AUTH = 'REQUEST_AUTH',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    FETCHED_AUTH = 'FETCHED_AUTH',
}


export interface IAuthSuccess extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.AUTH_SUCCESS,
    token: string
}
export interface IAuthFailed extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.AUTH_FAILED,
    error: any
}
export interface IFetchedAuth extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.FETCHED_AUTH,
    authData: LoginDto
}


