import { PostDto } from "../../../types/post/post.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	ICreateSuccess, IDeleteSuccess,
	IFetchedCreate, IFetchedUDelete, IFetchedUpdate, ILikeSuccess,
	IPostsFailed,
	IPostsSuccess,
	IPostSuccess,
	IUnlikeSuccess,
	IUpdateSuccess
} from "./action.types";


interface PostState {
	posts: PostDto[] | null,
	currentPost: PostDto | null,
	loading: boolean;
	error: any;
}

const initialState: PostState = {
	posts: null,
	currentPost: null,
	loading: false,
	error: null
};

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		fetchedPosts(state) {
			state.loading = true;
		},
		postsSuccess(state, action: PayloadAction<IPostsSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		},
		postsFailed(state, action: PayloadAction<IPostsFailed>) {
			state.loading = false;
			state.currentPost = action.payload.error;
		},
		fetchedPost(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		postSuccess(state, action: PayloadAction<IPostSuccess>) {
			state.currentPost = action.payload.payload;
		},
		fetchedCreate(state, action: PayloadAction<IFetchedCreate>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<ICreateSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		},
		fetchedUpdate(state, action: PayloadAction<IFetchedUpdate>) {
			state.loading = true;
		},
		updateSuccess(state, action: PayloadAction<IUpdateSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		},
		fetchedDelete(state, action: PayloadAction<IFetchedUDelete>) {
			state.loading = true;
		},
		deleteSuccess(state, action: PayloadAction<IDeleteSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		},
		fetchedLike(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		likeSuccess(state, action: PayloadAction<ILikeSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		},
		fetchedUnlike(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		unlikeSuccess(state, action: PayloadAction<IUnlikeSuccess>) {
			state.loading = false;
			state.posts = action.payload.payload;
		}
	}
});


export const {
	fetchedLike,
	fetchedUnlike,
	fetchedPost,
	fetchedCreate,
	fetchedUpdate,
	likeSuccess,
	unlikeSuccess,
	fetchedPosts,
	postsFailed,
	postsSuccess,
	postSuccess,
	updateSuccess,
	createSuccess,
	deleteSuccess,
	fetchedDelete
} = postSlice.actions;

export const postReducer = postSlice.reducer;
