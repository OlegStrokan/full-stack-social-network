import { Action } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { CreateConversationDto, JoinConversationDto } from "../../../types/message/conversation.dto";

export enum ProfileActionTypes {
	FETCHED_INIT = 'FETCHED_INIT',
	FETCHED_CREATE_CONVERSATION = 'FETCHED_CREATE_CONVERSATION',
	FETCHED_JOIN_CONVERSATION = 'FETCHED_JOIN_CONVERSATION',
}

export interface IFetchedInit extends Action<ProfileActionTypes>{
	type: ProfileActionTypes.FETCHED_INIT,
	payload: Socket
}

export interface IFetchedCreateConversation extends Action<ProfileActionTypes>{
	type: ProfileActionTypes.FETCHED_CREATE_CONVERSATION,
	payload: CreateConversationDto
}

export interface IFetchedJoinConversation extends Action<ProfileActionTypes>{
	type: ProfileActionTypes.FETCHED_JOIN_CONVERSATION,
	payload: JoinConversationDto
}



