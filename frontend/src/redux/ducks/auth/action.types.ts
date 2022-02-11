import { Action } from "@reduxjs/toolkit";


export enum HistoricalDataActionsTypes {
    REQUEST_AUTH = 'REQUEST_AUTH',
    AUTH_SUCCESS = 'AUTH_SUCCESS',
    AUTH_FAILED = 'AUTH_FAILED',
    FETCHED_AUTH = 'FETCHED_AUTH',
}

export interface IRequestAuth extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.REQUEST_AUTH,
    loading: boolean
}
export interface IAuthSuccess extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.AUTH_SUCCESS,
    token: string
}
export interface IAuthFailed extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.AUTH_FAILED,
    error: any
}
export interface IFetchedData extends Action<HistoricalDataActionsTypes>{
    type: HistoricalDataActionsTypes.FETCHED_AUTH,
}


