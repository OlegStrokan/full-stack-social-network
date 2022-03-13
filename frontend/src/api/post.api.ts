import { IApiOkResponse, instance } from "./instance.api";
import { CreatePostDto } from "../types/post/createPost.dto";
import { PostDto } from "../types/post/post.dto";
import { UpdatePostDto } from "../types/post/updatePost.dto";
import { LikeDislikePostDto } from "../types/post/likeDislikePost.dto";



export const postAPI = {
    getPosts(): Promise<IApiOkResponse<PostDto[]>> {
        return instance.get<IApiOkResponse<PostDto[]>>('/posts').then((response) => response.data)
    },
    getPost(id: number): Promise<IApiOkResponse<PostDto>> {
        return instance.get<IApiOkResponse<PostDto>>(`/posts/${id}`).then((response) => response.data)
    },
    createPost(dto: CreatePostDto): Promise<IApiOkResponse<PostDto>> {
        const data = new FormData();
        data.append('title', dto.title)
        data.append('content', dto.content)
        data.append('userId', String(dto.userId))
        data.append('image', dto.image[0])
        return instance.post<IApiOkResponse<PostDto>>('/posts', data).then((response) => response.data)
    },
    updatePost(dto: UpdatePostDto): Promise<IApiOkResponse<PostDto[]>> {
        const data = new FormData();
        data.append('title', dto.title)
        data.append('content', dto.content)
        data.append('image', dto.image[0])
        return instance.patch<IApiOkResponse<PostDto[]>>(`/posts/${dto.postId}`, data).then((response) => response.data)
    },
    deletePost(id: number): Promise<IApiOkResponse<PostDto[]>> {
        return instance.delete<IApiOkResponse<PostDto[]>>(`posts/${id}`).then((response) => response.data)
    },
    likePost(dto: LikeDislikePostDto): Promise<IApiOkResponse<PostDto[]>> {
        return instance.patch<IApiOkResponse<PostDto[]>>(`posts/${dto.postId}/like/${dto.userId}`).then((response) => response.data)
    },
    unlikePost(dto: LikeDislikePostDto): Promise<IApiOkResponse<PostDto[]>> {
        return instance.delete<IApiOkResponse<PostDto[]>>(`posts/${dto.postId}/like/${dto.userId}`).then((response) => response.data)
    },
    dislikePost(dto: LikeDislikePostDto): Promise<IApiOkResponse<PostDto[]>> {
        return instance.patch<IApiOkResponse<PostDto[]>>(`posts/${dto.postId}/dislike/${dto.userId}`).then((response) => response.data)
    },
    undislikePost(dto: LikeDislikePostDto): Promise<IApiOkResponse<PostDto[]>> {
        return instance.delete<IApiOkResponse<PostDto[]>>(`posts/${dto.postId}/dislike/${dto.userId}`).then((response) => response.data)
    },

}
