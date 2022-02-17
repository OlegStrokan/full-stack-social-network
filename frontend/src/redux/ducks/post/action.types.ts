import { Action } from "@reduxjs/toolkit";
import { CreatePostDto } from "../../../types/post/createPost.dto";
import { UpdatePostDto } from "../../../types/post/updatePost.dto";


export enum PostActionTypes {
    FETCHED_POST = 'FETCHED_POST',
    FETCHED_CREATE = 'FETCHED_CREATE',
    FETCHED_UPDATE = 'FETCHED_UPDATE',
    FETCHED_DELETE = 'FETCHED_DELETE',
    FETCHED_LIKE = 'FETCHED_LIKE',
    FETCHED_UNLIKE = 'FETCHED_UNLIKE'
}


export interface IFetchedPost extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_POST,
    payload: number
}

export interface IFetchedCreate extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_CREATE,
    payload: CreatePostDto
}


export interface IFetchedUpdate extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UPDATE,
    payload: UpdatePostDto
}


export interface IFetchedUDelete extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_DELETE,
    payload: number
}

export interface IFetchedLike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_LIKE,
    payload: number
}

export interface IFetchedUnlike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UNLIKE,
    payload: number
}





