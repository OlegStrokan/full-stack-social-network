import { Action } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export enum ProfileActionTypes {
	FETCHED_INIT = 'FETCHED_INIT',
}

export interface IFetchedInit extends Action<ProfileActionTypes>{
	type: ProfileActionTypes.FETCHED_INIT,
	payload: Socket
}
