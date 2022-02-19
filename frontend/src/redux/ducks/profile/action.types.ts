import { Action } from "@reduxjs/toolkit";
import { UpdateStatusDto } from "../../../types/profile/updateStatus.dto";
import { UpdateAvatarDto } from "../../../types/profile/updateAvatar.dto";
import { FollowDto } from "../../../types/profile/follow.dto";
import { UnfollowDto } from "../../../types/profile/unfollow.dto";
import { UpdateProfileDto } from "../../../types/profile/updateProfile.dto";

export enum ProfileActionTypes {
    FETCHED_PROFILE = 'FETCHED_PROFILE',
    FETCHED_UPDATE = 'FETCHED_UPDATE',
    FETCHED_STATUS = 'FETCHED_STATUS',
    FETCHED_AVATAR = 'FETCHED_AVATAR',
    FETCHED_FOLLOW = 'FETCHED_FOLLOW',
    FETCHED_UNFOLLOW = 'FETCHED_UNFOLLOW',
    FETCHED_ACTIVATE = 'FETCHED_ACTIVATE',
}

export interface IFetchedProfile extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_PROFILE,
    payload: number
}

export interface IFetchedUpdate extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_UPDATE,
    payload: UpdateProfileDto
}

export interface IFetchedStatus extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_STATUS,
    payload: UpdateStatusDto
}

export interface IFetchedAvatar extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_AVATAR,
    payload: UpdateAvatarDto
}

export interface IFetchedFollow extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_FOLLOW,
    payload: FollowDto
}

export interface IFetchedUnfollow extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_UNFOLLOW,
    payload: UnfollowDto
}

export interface IFetchedActivate extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_ACTIVATE,
    payload: number
}

