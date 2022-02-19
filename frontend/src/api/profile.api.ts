import { ProfileDto } from "../types/profile/profile.dto";
import { instance } from "./instance.api";
import { FollowDto } from "../types/profile/follow.dto";
import { UnfollowDto } from "../types/profile/unfollow.dto";
import { UpdateStatusDto } from "../types/profile/updateStatus.dto";
import { UpdateAvatarDto } from "../types/profile/updateAvatar.dto";
import { UpdateProfileDto } from "../types/profile/updateProfile.dto";

export const profileAPI = {
    getProfile(id: number): Promise<ProfileDto> {
        return instance.get<ProfileDto>(`/profile/${id}`).then((response) => response.data)
    },
    update(dto: UpdateProfileDto) {
        return instance.patch(`/profile/${dto.id}`, dto).then((response) => response.data)
    },
    updateStatus(dto: UpdateStatusDto): Promise<ProfileDto> {
        return instance.patch<ProfileDto>(`/profile/${dto.id}/status`, {status: dto.status}).then((response) => response.data)
    },
    updateAvatar(dto: UpdateAvatarDto): Promise<ProfileDto> {
        const data = new FormData();
        data.append('avatar', dto.avatar);
        return instance.patch<ProfileDto>(`/profile/${dto.id}/avatar`, data ).then((response) => response.data)
    },
    follow(dto: FollowDto): Promise<ProfileDto> {
        return instance.patch<ProfileDto>(`/profile/${dto.user_id}/follow/${dto.follow_id}`).then((response) => response.data)
    },
    unfollow(dto: UnfollowDto): Promise<ProfileDto> {
        return instance.delete<ProfileDto>(`/profile/${dto.user_id}/unfollow/${dto.unfollow_id}`).then((response) => response.data)
    },
    activate(id: number): Promise<ProfileDto> {
        return instance.get<ProfileDto>(`/profile/${id}/activate`).then((response) => response.data)
    }
}
