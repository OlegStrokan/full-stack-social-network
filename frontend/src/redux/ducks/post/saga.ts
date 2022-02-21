import {
	IFetchedCreate,
	IFetchedLike,
	IFetchedPost,
	IFetchedUDelete,
	IFetchedUnlike,
	IFetchedUpdate
} from "./action.types";
import { call, put, takeEvery } from "redux-saga/effects";
import { postAPI } from "../../../api/post.api";
import {
	createSuccess,
	deleteSuccess,
	likeSuccess,
	postsFailed,
	postsSuccess,
	postSuccess,
	unlikeSuccess,
	updateSuccess
} from "./post.slice";
import { PostDto } from "../../../types/post/post.dto";

function* getPosts() {
	try {
		const data: PostDto[] = yield call(postAPI.getPosts);
		yield put(postsSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* getPost({ payload }: IFetchedPost) {
	try {
		const data: PostDto = yield call(postAPI.getPost, payload);
		yield put(postSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* createPost({ payload }: IFetchedCreate) {
	debugger
	try {
		const data: PostDto[] = yield call(postAPI.createPost, payload);
		yield put(createSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* updatePost({ payload }: IFetchedUpdate) {
	try {
		const data: PostDto[] = yield call(postAPI.updatePost, payload);
		yield put(updateSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* deletePost({ payload }: IFetchedUDelete) {
	try {
		const data: PostDto[] = yield call(postAPI.deletePost, payload);
		yield put(deleteSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* likePost({ payload }: IFetchedLike) {
	try {
		const data: PostDto[] = yield call(postAPI.likePost, payload);
		yield put(likeSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

function* unlikePost({ payload }: IFetchedUnlike) {
	try {
		const data: PostDto[] = yield call(postAPI.unlikePost, payload);
		yield put(unlikeSuccess(data));
	} catch (error: any) {
		yield put(postsFailed(error));
	}
}

export function* postWatcher() {
	yield takeEvery("post/fetchedPosts", getPosts);
	yield takeEvery("post/fetchedPost", getPost);
	yield takeEvery("post/fetchedCreate", createPost);
	yield takeEvery("post/fetchedUpdate", updatePost);
	yield takeEvery("post/fetchedDelete", deletePost);
	yield takeEvery("post/fetchedLike", likePost);
	yield takeEvery("post/fetchedUnlike", unlikePost);
}
