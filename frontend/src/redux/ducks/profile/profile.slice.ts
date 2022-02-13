import { ProfileDto } from "../../../types/profile/profile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    IActivateSuccess,
    IAvatarSuccess,
    IFetchedActivate,
    IFetchedAvatar, IFetchedFollow,
    IFetchedStatus, IFetchedUnfollow, IFollowSuccess,
    IProfileFailed,
    IProfileSuccess,
    IStatusSuccess, IUnfollowSuccess
} from "./action.types";
import { authSlice } from "../auth/auth.slice";

interface ProfileState {
    profile: ProfileDto | null;
    loading: boolean;
    error: any;
}

const initialState: ProfileState = {
    profile: null,
    loading: false,
    error: null
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        fetchedProfile(state, action: PayloadAction<number>) {
            state.loading = true;
        },
        profileSuccess(state, action: PayloadAction<IProfileSuccess>) {
            state.loading = false;
            state.profile = action.payload.payload;
        },
        profileFailed(state, action: PayloadAction<IProfileFailed>) {
            state.loading = false;
            state.error = action.payload.error
        },
        fetchedStatus(state, action: PayloadAction<IFetchedStatus>) {
            state.loading = true;
        },
        statusSuccess(state, action: PayloadAction<IStatusSuccess>) {
            state.loading = false;
            state.profile = action.payload.payload
        },
        fetchedAvatar(state, action: PayloadAction<IFetchedAvatar>) {
            state.loading = true;
        },
        avatarSuccess(state, action: PayloadAction<IAvatarSuccess>) {
            state.profile = action.payload.payload
        },
        fetchedFollow(state, action: PayloadAction<IFetchedFollow>) {
            state.loading = true;
        },
        followSuccess(state, action: PayloadAction<IFollowSuccess>) {
            state.profile = action.payload.payload
        },
        fetchedUnfollow(state, action: PayloadAction<IFetchedUnfollow>) {
            state.loading = true;
        },
        unfollowSuccess(state, action: PayloadAction<IUnfollowSuccess>) {
            state.profile = action.payload.payload
        },
        fetchedActivate(state, action: PayloadAction<IFetchedActivate>) {
            state.loading = true;
        },
        activateSuccess(state, action: PayloadAction<IActivateSuccess>) {
            state.profile = action.payload.payload
        },

    }
});

export const {
    fetchedProfile,
    fetchedActivate,
    fetchedAvatar,
    fetchedFollow,
    fetchedStatus,
    fetchedUnfollow,
    avatarSuccess,
    followSuccess,
    profileFailed,
    statusSuccess,
    unfollowSuccess,
    activateSuccess,
    profileSuccess
} = profileSlice.actions

export const profileReducer = profileSlice.reducer











