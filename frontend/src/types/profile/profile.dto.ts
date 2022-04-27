import { PostDto } from "../post/post.dto";
import { PhotoDto } from "../photo/photo.dto";
import { IRoleDto, RoleDto } from '../role/role.dto';
import { ConversationDto } from '../message/conversation.dto';
import { MessageDto } from '../message/message.dto';
import { FollowDto } from './follow.dto';

export interface ProfileDto {
	id: number;
	email: string;
	username: string;
	fullname: string;
	password: string;
	activationLink: string;
	verificationCode: string;
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
	posts?: PostDto[];
	photos?: PhotoDto[];
	roles?: IRoleDto[]
	blockedUser?: ProfileDto[];
	conversations?: ConversationDto[];
	messages?: MessageDto[];
	follows: FollowDto[];
}
