export interface PostDto {
    id: number;
    title: string;
    content: string;
    image: string;
    likesCount: number;
    isLiked: boolean;
    userId: number;
}
