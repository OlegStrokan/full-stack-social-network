import { Action } from "@reduxjs/toolkit";
import { LoginDto } from "../../../types/auth/login.dto";
import { RegistrationDto } from "../../../types/auth/registration.dto";
import { VerifyCodeDto } from '../../../types/auth/verify-code.dto';
import { SetPasswordDto } from '../../../types/auth/set-password.dto';

export enum AuthActionTypes {
    FETCHED_ME = 'FETCHED_ME',
    FETCHED_LOGIN = 'FETCHED_LOGIN',
    FETCHED_REGISTRATION = 'FETCHED_REGISTRATION',
    FETCHED_SEND_EMAIL = 'FETCHED_SEND_EMAIL',
    FETCHED_VERIFY_CODE = 'FETCHED_VERIFY_CODE',
    FETCHED_SET_PASSWORD = 'FETCHED_SET_PASSWORD',
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

export interface IFetchedSendEmail extends Action<AuthActionTypes> {
    type: AuthActionTypes.FETCHED_SEND_EMAIL,
    payload: string
}

export interface IFetchedVerifyCode extends Action<AuthActionTypes> {
    type: AuthActionTypes.FETCHED_VERIFY_CODE,
    payload: VerifyCodeDto
}

export interface IFetchedSetPassword extends Action<AuthActionTypes>{
    type: AuthActionTypes.FETCHED_SET_PASSWORD,
    payload: SetPasswordDto
}
