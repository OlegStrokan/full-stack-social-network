import { Action } from "@reduxjs/toolkit";
import { CreateUserDto } from "../../../types/user/createUser.dto";
import { AddRoleDto } from "../../../types/user/addRole.dto";
import { BanUserDto } from "../../../types/user/banUser.dto";

export enum UserActionTypes {
	FETCHED_CREATE = "FETCHED_CREATE",
	FETCHED_ADD_ROLE = "FETCHED_ADD_ROLE",
	FETCHED_BAN = "FETCHED_BAN",
	FETCHED_UNBAN = "FETCHED_UNBAN",
}

export interface IFetchedCreate extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_CREATE,
	payload: CreateUserDto
}

export interface IFetchedAddRole extends Action<UserActionTypes>{
	type: UserActionTypes.FETCHED_ADD_ROLE,
	payload: AddRoleDto
}

export interface IFetchedBan extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_BAN,
	payload: BanUserDto
}

export interface IFetchedUnban extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_UNBAN
	payload: number,
}
