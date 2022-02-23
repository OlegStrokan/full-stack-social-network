import { ProfileDto } from "../../../types/profile/profile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	IFetchedActivate
} from "./action.types";
import { UpdateStatusDto } from "../../../types/profile/updateStatus.dto";
import { UpdateProfileDto } from "../../../types/profile/updateProfile.dto";
import { PostDto } from "../../../types/post/post.dto";

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
		profileSuccess(state, action: PayloadAction<ProfileDto>) {
			state.loading = false;
			state.profile = action.payload;
		},
		profileFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		},
		fetchedUpdate(state, action: PayloadAction<UpdateProfileDto>) {
			state.loading = false;
		},
		updateSuccess(state, action: PayloadAction<ProfileDto>) {
			state.loading = false;
			state.profile = action.payload;
		},
		fetchedStatus(state, action: PayloadAction<UpdateStatusDto>) {
			state.loading = true;
		},
		statusSuccess(state, action: PayloadAction<ProfileDto>) {
			state.loading = false;
			state.profile = action.payload;
		},
		fetchedAvatar(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		avatarSuccess(state, action: PayloadAction<ProfileDto>) {
			state.profile = action.payload;
		},
		fetchedFollow(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		followSuccess(state, action: PayloadAction<ProfileDto>) {
			state.profile = action.payload;
		},
		fetchedUnfollow(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		unfollowSuccess(state, action: PayloadAction<ProfileDto>) {
			state.profile = action.payload;
		},
		fetchedActivate(state, action: PayloadAction<IFetchedActivate>) {
			state.loading = true;
		},
		activateSuccess(state, action: PayloadAction<ProfileDto>) {
			state.profile = action.payload;
		},
		fetchedPostDelete(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		deletePostSuccess(state, action: PayloadAction<PostDto[]>) {
			debugger
			state.loading = false;
			// @ts-ignore
			state.profile.posts = action.payload.data;
		}

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
	profileSuccess,
	fetchedPostDelete,
	updateSuccess,
	fetchedUpdate,
	deletePostSuccess
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;











