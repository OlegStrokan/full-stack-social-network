import { Action } from "@reduxjs/toolkit";
import { ProfileDto } from "../../../types/profile/profile.dto";
import { CreateUserDto } from "../../../types/user/createUser.dto";
import { AddRoleDto } from "../../../types/user/addRole.dto";
import { BanUserDto } from "../../../types/user/banUser.dto";

export enum UserActionTypes {
	USERS_SUCCESS = "USERS_SUCCESS",
	USERS_FAILED = "USERS_FAILED",
	FETCHED_USERS = "FETCHED_USERS",
	CREATE_SUCCESS = "CREATE_SUCCESS",
	FETCHED_CREATE = "FETCHED_CREATE",
	ADD_ROLE_SUCCESS = "ADD_ROLE_SUCCESS",
	FETCHED_ADD_ROLE = "FETCHED_ADD_ROLE",
	BAN_SUCCESS = "BAN_SUCCESS",
	FETCHED_BAN = "FETCHED_BAN",
	UNBAN_SUCCESS = "UNBAN_SUCCESS",
	FETCHED_UNBAN = "FETCHED_UNBAN",
}

export interface IUsersSuccess extends Action<UserActionTypes> {
	type: UserActionTypes.USERS_SUCCESS,
	payload: ProfileDto[]
}

export interface IFetchedUsers extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_USERS;
}

export interface IUsersFailed extends Action<UserActionTypes> {
	type: UserActionTypes.USERS_FAILED,
	error: any
}

export interface ICreateSuccess extends Action<UserActionTypes> {
	type: UserActionTypes.CREATE_SUCCESS,
	payload: ProfileDto[]
}

export interface IFetchedCreate extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_CREATE,
	payload: CreateUserDto
}

export interface IAddRoleSuccess extends Action<UserActionTypes> {
	type: UserActionTypes.ADD_ROLE_SUCCESS,
	payload: ProfileDto[]
}

export interface IFetchedAddRole extends Action<UserActionTypes>{
	type: UserActionTypes.FETCHED_ADD_ROLE,
	payload: AddRoleDto
}

export interface IBanSuccess extends Action<UserActionTypes> {
	type: UserActionTypes.BAN_SUCCESS,
	payload: ProfileDto[]
}

export interface IFetchedBan extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_BAN,
	payload: BanUserDto
}

export interface IUnbanSuccess extends Action<UserActionTypes> {
	type: UserActionTypes.UNBAN_SUCCESS,
	payload: ProfileDto[]
}

export interface IFetchedUnban extends Action<UserActionTypes> {
	type: UserActionTypes.FETCHED_UNBAN
	payload: number,
}
