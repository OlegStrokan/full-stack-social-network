import { ProfileDto } from "../../../types/profile/profile.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchedActivate } from "./action.types";
import { UpdateStatusDto } from "../../../types/profile/updateStatus.dto";
import { UpdateProfileDto } from "../../../types/profile/updateProfile.dto";
import { PostDto } from "../../../types/post/post.dto";
import { IApiOkResponse } from "../../../api/instance.api";
import { CreatePostDto } from "../../../types/post/createPost.dto";
import { UpdateAvatarDto } from "../../../types/profile/updateAvatar.dto";

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
		fetchedAvatar(state, action: PayloadAction<UpdateAvatarDto>) {
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
		fetchedPostCreate(state, action: PayloadAction<CreatePostDto>) {
			state.loading = true;
		},
		createPostSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			// @ts-ignore
			state.profile.posts = action.payload;
		},
		fetchedPostDelete(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		updatePostSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			// @ts-ignore
			state.profile.posts = action.payload;
		},
		fetchedPostUpdate(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		deletePostSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			// @ts-ignore
			state.profile.posts = action.payload;
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
	fetchedPostUpdate,
	updatePostSuccess,
	updateSuccess,
	fetchedUpdate,
	deletePostSuccess,
	createPostSuccess,
	fetchedPostCreate
} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
