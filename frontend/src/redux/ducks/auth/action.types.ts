import { Action } from "@reduxjs/toolkit";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";

export enum AuthActionTypes {
    FETCHED_ME = 'FETCHED_ME',
    FETCHED_LOGIN = 'FETCHED_LOGIN',
    FETCHED_REGISTRATION = 'FETCHED_REGISTRATION',
}


export interface IFetchedMe extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_ME,
}

export interface IFetchedLogin extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_LOGIN,
    payload: LoginDto
}
export interface IFetchedRegistration extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_REGISTRATION,
    payload: RegistrationDto
}

