export interface CreatePostDto {
    title: string;
    content: string;
    userId: number;
    image: string | string[]
}
