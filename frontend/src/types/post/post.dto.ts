export interface PostDto {
    id: number;
    title: string;
    content: string;
    image: string | string[];
    likesCount: number;
    userId: number;
}
