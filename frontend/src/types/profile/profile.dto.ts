import { PostDto } from "../post/post.dto";
import { PhotoDto } from "../photo/photo.dto";

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
	location: string;
	job: string;
	birth: string;
	about: string;
	interests: string;
	avatar: string;
	posts: PostDto[];
	photos: PhotoDto[]
	roles: any[];
}
