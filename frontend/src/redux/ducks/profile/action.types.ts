import { Action } from "@reduxjs/toolkit";
import { ProfileDto } from "../../../types/profile/profile.dto";
import { UpdateStatusDto } from "../../../types/profile/updateStatus.dto";
import { UpdateAvatarDto } from "../../../types/profile/updateAvatar.dto";
import { FollowDto } from "../../../types/profile/follow.dto";
import { UnfollowDto } from "../../../types/profile/unfollow.dto";

export enum ProfileActionTypes {
    PROFILE_SUCCESS = 'PROFILE_SUCCESS',
    PROFILE_FAILED = 'PROFILE_FAILED',
    FETCHED_PROFILE = 'FETCHED_PROFILE',
    STATUS_SUCCESS = 'STATUS_SUCCESS',
    FETCHED_STATUS = 'FETCHED_STATUS',
    AVATAR_SUCCESS = 'AVATAR_SUCCESS',
    FETCHED_AVATAR = 'FETCHED_AVATAR',
    FOLLOW_SUCCESS = 'FOLLOW_SUCCESS',
    FETCHED_FOLLOW = 'FETCHED_FOLLOW',
    UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS',
    FETCHED_UNFOLLOW = 'FETCHED_UNFOLLOW',
    ACTIVATE_SUCCESS = 'ACTIVATE_SUCCESS',
    FETCHED_ACTIVATE = 'FETCHED_ACTIVATE',
}

export interface IProfileSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.PROFILE_SUCCESS,
    payload: ProfileDto
}

export interface IProfileFailed extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.PROFILE_FAILED,
    error: any
}

export interface IFetchedProfile extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_PROFILE,
    payload: number
}

export interface IStatusSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.STATUS_SUCCESS,
    payload: ProfileDto
}

export interface IFetchedStatus extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_STATUS,
    payload: UpdateStatusDto
}

export interface IAvatarSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.AVATAR_SUCCESS,
    payload: ProfileDto
}

export interface IFetchedAvatar extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_AVATAR,
    payload: UpdateAvatarDto
}

export interface IFollowSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FOLLOW_SUCCESS,
    payload: ProfileDto
}

export interface IFetchedFollow extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_FOLLOW,
    payload: FollowDto
}

export interface IUnfollowSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.UNFOLLOW_SUCCESS,
    payload: ProfileDto
}

export interface IFetchedUnfollow extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_UNFOLLOW,
    payload: UnfollowDto
}

export interface IActivateSuccess extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.ACTIVATE_SUCCESS,
    payload: ProfileDto
}

export interface IFetchedActivate extends Action<ProfileActionTypes>{
    type: ProfileActionTypes.FETCHED_ACTIVATE,
    payload: number
}

