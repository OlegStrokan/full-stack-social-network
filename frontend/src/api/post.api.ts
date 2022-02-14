import { instance } from "./instance.api";
import { CreatePostDto } from "../types/post/createPost.dto";
import { PostDto } from "../types/post/post.dto";
import { ISuccessResponse } from "./auth.api";
import { UpdatePostDto } from "../types/post/updatePost.dto";


export const postAPI = {
    getPosts(): Promise<PostDto[]> {
        return instance.get<PostDto[]>('/posts').then((response) => response.data)
    },
    getPost(id: number): Promise<PostDto> {
        return instance.get<PostDto>(`/posts/${id}`).then((response) => response.data)
    },
    createPost(dto: CreatePostDto): Promise<PostDto> {
        return instance.post<PostDto>('/posts', dto).then((response) => response.data)
    },
    updatePost(dto: UpdatePostDto): Promise<PostDto> {
        return instance.patch<PostDto>(`/posts${dto.id}`, dto).then((response) => response.data)
    },
    deletePost(id: number): Promise<ISuccessResponse> {
        return instance.delete<ISuccessResponse>(`posts/${id}`).then((response) => response.data)
    },
    like(id: number): Promise<PostDto> {
        return instance.delete<PostDto>(`posts/like/${id}`).then((response) => response.data)
    },
    unlike(id: number): Promise<PostDto> {
        return instance.delete<PostDto>(`posts/like/${id}`).then((response) => response.data)
    },

}
