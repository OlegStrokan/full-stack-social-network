import { PostDto } from "../post/post.dto";

export interface ProfileDto {
	id: number;
	email: string;
	username: string;
	fullname: string;
	password: string;
	activationLink: string;
	activated: true;
	banned: true;
	banReason: string;
	status: string;
	about: string;
	avatar: string;
	posts: PostDto[];
	roles: any[];
}
