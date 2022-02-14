export interface UpdatePostDto {
    id: number
    title: string;
    content: string;
    image: string | string[];
    likesCount: number;
}
