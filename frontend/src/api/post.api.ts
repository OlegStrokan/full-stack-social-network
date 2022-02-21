import { instance } from "./instance.api";
import { CreatePostDto } from "../types/post/createPost.dto";
import { PostDto } from "../types/post/post.dto";
import { UpdatePostDto } from "../types/post/updatePost.dto";


export const postAPI = {
    getPosts(): Promise<PostDto[]> {
        return instance.get<PostDto[]>('/posts').then((response) => response.data)
    },
    getPost(id: number): Promise<PostDto> {
        return instance.get<PostDto>(`/posts/${id}`).then((response) => response.data)
    },
    createPost(dto: CreatePostDto): Promise<PostDto[]> {
        const data = new FormData();
        data.append('title', dto.title)
        data.append('content', dto.content)
        data.append('userId', String(dto.userId))
        data.append('image', dto.image)
        return instance.post<PostDto[]>('/posts', dto).then((response) => response.data)
    },
    updatePost(dto: UpdatePostDto): Promise<PostDto[]> {
        const data = new FormData();
        data.append('title', dto.title)
        data.append('content', dto.content)
        data.append('likesCount', String(dto.likesCount))
        data.append('image', dto.image)
        return instance.patch<PostDto[]>(`/posts${dto.id}`, dto).then((response) => response.data)
    },
    deletePost(id: number): Promise<PostDto[]> {
        return instance.delete<PostDto[]>(`posts/${id}`).then((response) => response.data)
    },
    likePost(id: number): Promise<PostDto[]> {
        return instance.patch<PostDto[]>(`posts/like/${id}`).then((response) => response.data)
    },
    unlikePost(id: number): Promise<PostDto[]> {
        return instance.patch<PostDto[]>(`posts/like/${id}`).then((response) => response.data)
    },

}
