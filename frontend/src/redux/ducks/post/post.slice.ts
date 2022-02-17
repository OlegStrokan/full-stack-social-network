import { PostDto } from "../../../types/post/post.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CreatePostDto } from "../../../types/post/createPost.dto";
import { UpdatePostDto } from "../../../types/post/updatePost.dto";


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
		postsSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
		},
		postsFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.currentPost = action.payload;
		},
		fetchedPost(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		postSuccess(state, action: PayloadAction<PostDto>) {
			state.currentPost = action.payload;
		},
		fetchedCreate(state, action: PayloadAction<CreatePostDto>) {
			state.loading = true;
		},
		createSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
		},
		fetchedUpdate(state, action: PayloadAction<UpdatePostDto>) {
			state.loading = true;
		},
		updateSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
		},
		fetchedDelete(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		deleteSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
		},
		fetchedLike(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		likeSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
		},
		fetchedUnlike(state, action: PayloadAction<number>) {
			state.loading = true;
		},
		unlikeSuccess(state, action: PayloadAction<PostDto[]>) {
			state.loading = false;
			state.posts = action.payload;
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
