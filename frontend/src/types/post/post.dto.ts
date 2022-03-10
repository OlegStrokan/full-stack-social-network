

interface PostActionDto {
    id: number;
    userId: number;
    postId: number;
}


export interface PostDto {
    id: number;
    title: string;
    content: string;
    image: string;
    userId: number;
    likes: PostActionDto[];
    dislikes: PostActionDto[];
}
