import { Action } from "@reduxjs/toolkit";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";


export enum AuthActionTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    FETCHED_LOGIN = 'FETCHED_LOGIN',
    REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILED = 'REGISTRATION_FAILED',
    FETCHED_REGISTRATION = 'FETCHED_REGISTRATION',
}


export interface ILoginSuccess extends Action<AuthActionTypes>{
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: string
}
export interface ILoginFailed extends Action<AuthActionTypes>{
    type: AuthActionTypes.LOGIN_FAILED,
    error: any
}
export interface IFetchedLogin extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_LOGIN,
    payload: LoginDto
}
export interface IRegistrationSuccess extends Action<AuthActionTypes>{
    type: AuthActionTypes.REGISTRATION_SUCCESS,
    payload: string
}
export interface IRegistrationFailed extends Action<AuthActionTypes>{
    type: AuthActionTypes.REGISTRATION_FAILED,
    error: any
}
export interface IFetchedRegistration extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_REGISTRATION,
    payload: RegistrationDto
}

