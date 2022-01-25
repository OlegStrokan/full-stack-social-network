

export class UpdatePostDto {
    readonly title: string;
    readonly content: string;
    readonly image: string | string[];
    readonly likesCount: number;
}
