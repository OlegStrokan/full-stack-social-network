import { Action } from "@reduxjs/toolkit";
import { CreateRoleDto } from "../../../types/role/createRole.dto";

export enum RoleActionTypes {
	"FETCHED_ROLE" = "FETCHED_ROLE",
	"FETCHED_CREATE" = "FETCHED_CREATE",
}


export interface IFetchedRole extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_ROLE,
	payload: string
}

export interface IFetchedRole extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_ROLE,
	payload: string
}

export interface IFetchedCreate extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_CREATE,
	payload: CreateRoleDto
}

