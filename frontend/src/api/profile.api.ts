import { ProfileDto } from "../types/profile/profile.dto";
import { instance } from "./instance.api";
import { ISuccessResponse } from "./auth.api";

export const profileApi = {
    getProfile(id: number): Promise<ProfileDto> {
        return instance.get<ProfileDto>(`/profile/${id}`).then((response) => response.data)
    },
    updateStatus(id: number, status: string): Promise<ProfileDto> {
        return instance.patch<ProfileDto>(`/profile/${id}/status`, {status}).then((response) => response.data)
    },
    changeAvatar(id: number): Promise<ProfileDto> {
        return instance.patch<ProfileDto>(`/profile/${id}/avatar`).then((response) => response.data)
    },
    follow(user_id: number, follow_id: number): Promise<ISuccessResponse> {
        return instance.patch<ISuccessResponse>(`/profile/${user_id}/follow/${follow_id}`).then((response) => response.data)
    },
    unfollow(user_id: number, unfollow_id: number): Promise<ISuccessResponse> {
        return instance.delete<ISuccessResponse>(`/profile/${user_id}/unfollow/${unfollow_id}`).then((response) => response.data)
    },
    activate(id: number): Promise<ProfileDto> {
        return instance.get<ProfileDto>(`/profile/${id}/activate`).then((response) => response.data)
    }
}
