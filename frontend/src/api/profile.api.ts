import { ProfileDto } from "../types/profile/profile.dto";
import { IApiOkResponse, instance } from "./instance.api";
import { FollowDto } from "../types/profile/follow.dto";
import { UnfollowDto } from "../types/profile/unfollow.dto";
import { UpdateStatusDto } from "../types/profile/updateStatus.dto";
import { UpdateAvatarDto } from "../types/profile/updateAvatar.dto";
import { UpdateProfileDto } from "../types/profile/updateProfile.dto";

export const profileAPI = {
    getProfile(id: number): Promise<IApiOkResponse<ProfileDto>> {
        return instance.get<IApiOkResponse<ProfileDto>>(`/profile/${id}`).then((response) => response.data)
    },
    update(dto: UpdateProfileDto) {
        return instance.patch(`/profile/${dto.id}`, dto).then((response) => response.data)
    },
    updateStatus(dto: UpdateStatusDto): Promise<IApiOkResponse<ProfileDto>> {
        return instance.patch<IApiOkResponse<ProfileDto>>(`/profile/${dto.id}/status`, {status: dto.status}).then((response) => response.data)
    },
    updateAvatar(dto: UpdateAvatarDto): Promise<IApiOkResponse<ProfileDto>> {
        const data = new FormData();
        data.append('avatar', dto.avatar);
        return instance.patch<IApiOkResponse<ProfileDto>>(`/profile/${dto.id}/avatar`, data ).then((response) => response.data)
    },
    follow(dto: FollowDto): Promise<IApiOkResponse<ProfileDto>> {
        return instance.patch<IApiOkResponse<ProfileDto>>(`/profile/${dto.userId}/follow/${dto.followId}`).then((response) => response.data)
    },
    unfollow(dto: UnfollowDto): Promise<IApiOkResponse<ProfileDto>> {
        return instance.delete<IApiOkResponse<ProfileDto>>(`/profile/${dto.userId}/unfollow/${dto.unfollowId}`).then((response) => response.data)
    },
    activate(id: number): Promise<IApiOkResponse<ProfileDto>> {
        return instance.get<IApiOkResponse<ProfileDto>>(`/profile/${id}/activate`).then((response) => response.data)
    }
}
