import { Action } from "@reduxjs/toolkit";
import { CreatePostDto } from "../../../types/post/createPost.dto";
import { UpdatePostDto } from "../../../types/post/updatePost.dto";
import { LikeDislikePostDto } from "../../../types/post/likeDislikePost.dto";


export enum PostActionTypes {
    FETCHED_POST = 'FETCHED_POST',
    FETCHED_CREATE = 'FETCHED_CREATE',
    FETCHED_UPDATE = 'FETCHED_UPDATE',
    FETCHED_DELETE = 'FETCHED_DELETE',
    FETCHED_LIKE = 'FETCHED_LIKE',
    FETCHED_UNLIKE = 'FETCHED_UNLIKE',
    FETCHED_DISLIKE = 'FETCHED_DISLIKE',
    FETCHED_UNDISLIKE = 'FETCHED_UNDISLIKE'
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

export interface IFetchedDelete extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_DELETE,
    payload: number
}

export interface IFetchedLike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_LIKE,
    payload: LikeDislikePostDto
}

export interface IFetchedUnlike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UNLIKE,
    payload: LikeDislikePostDto
}

export interface IFetchedDislike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_DISLIKE,
    payload: LikeDislikePostDto
}

export interface IFetchedUndislike extends Action<PostActionTypes> {
    type: PostActionTypes.FETCHED_UNDISLIKE,
    payload: LikeDislikePostDto
}




