import { Action } from "@reduxjs/toolkit";
import { PostDto } from "../../../types/post/post.dto";
import { CreatePostDto } from "../../../types/post/createPost.dto";
import { UpdatePostDto } from "../../../types/post/updatePost.dto";


export enum PostActionTypes {
    POSTS_SUCCESS = 'POSTS_SUCCESS',
    FETCHED_POSTS = 'FETCHED_POSTS',
    POST_SUCCESS = 'POST_SUCCESS',
    POST_FAILED = 'POST_FAILED',
    FETCHED_POST = 'FETCHED_POST',
    CREATE_SUCCESS = 'CREATE_SUCCESS',
    FETCHED_CREATE = 'FETCHED_CREATE',
    UPDATE_SUCCESS = 'UPDATE_SUCCESS',
    FETCHED_UPDATE = 'FETCHED_UPDATE',
    DELETE_SUCCESS = 'DELETE_SUCCESS',
    FETCHED_DELETE = 'FETCHED_DELETE',
    LIKE_SUCCESS = 'LIKE_SUCCESS',
    FETCHED_LIKE = 'FETCHED_LIKE',
    UNLIKE_SUCCESS = 'UNLIKE_SUCCESS',
    FETCHED_UNLIKE = 'FETCHED_UNLIKE'
}


export interface IPostsSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.POSTS_SUCCESS,
    payload: PostDto[]
}

export interface IFetchedPosts extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_POSTS,
}

export interface IPostSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.POST_SUCCESS,
    payload: PostDto
}

export interface IFetchedPost extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_POST,
    payload: number
}

export interface ICreateSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.CREATE_SUCCESS,
    payload: PostDto
}

export interface IFetchedCreate extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_CREATE,
    payload: CreatePostDto
}

export interface IUpdateSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.UPDATE_SUCCESS,
    payload: PostDto
}

export interface IFetchedUpdate extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UPDATE,
    payload: UpdatePostDto
}

export interface IDeleteSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.DELETE_SUCCESS,
    payload: PostDto
}

export interface IFetchedUDelete extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_DELETE,
    payload: UpdatePostDto
}

export interface ILikeSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.LIKE_SUCCESS,
    payload: PostDto
}

export interface IFetchedULike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_LIKE,
    payload: number
}
export interface IUnlikeSuccess extends Action<PostActionTypes> {
    type: PostActionTypes.UNLIKE_SUCCESS,
    payload: PostDto
}

export interface IFetchedUnlike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UNLIKE,
    payload: number
}





