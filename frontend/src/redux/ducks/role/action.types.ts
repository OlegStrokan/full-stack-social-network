import { Action } from "@reduxjs/toolkit";
import { RoleDto } from "../../../types/role/role.dto";
import { CreateRoleDto } from "../../../types/role/createRole.dto";

export enum RoleActionTypes {
	"FETCHED_ROLES" = "FETCHED_ROLES",
	"ROLES_SUCCESS" = "ROLES_SUCCESS",
	"FETCHED_ROLE" = "FETCHED_ROLE",
	"ROLE_SUCCESS" = "ROLES_SUCCES",
	"ROLES_FAILED" = "ROLES_FAILED",
	"FETCHED_CREATE" = "FETCHED_CREATE",
	"CREATE_SUCCESS" = "CREATE_SUCCESS"
}


export interface IFetchedRoles extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_ROLES,
}

export interface IRolesSuccess extends Action<RoleActionTypes> {
	type: RoleActionTypes.ROLES_SUCCESS
	payload: RoleDto[]
}

export interface IRoleFailed extends Action<RoleActionTypes> {
	type: RoleActionTypes.ROLES_FAILED,
	error: any
}

export interface IFetchedRole extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_ROLE,
	payload: string
}

export interface IRoleSuccess extends Action<RoleActionTypes> {
	type: RoleActionTypes.ROLE_SUCCESS
	payload: RoleDto
}

export interface IFetchedCreate extends Action<RoleActionTypes> {
	type: RoleActionTypes.FETCHED_CREATE,
	payload: CreateRoleDto
}

export interface ICreateSuccess extends Action<RoleActionTypes> {
	type: RoleActionTypes.CREATE_SUCCESS,
	payload: RoleDto[]
}
