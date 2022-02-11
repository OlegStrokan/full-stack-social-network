import { instance } from "./instance.api";
import { ProfileDto } from "../types/profile/profile.dto";


export const userApi = {
    getUsers(): Promise<ProfileDto[]> {
        return instance.get<ProfileDto[]>('/users').then((response) => response.data)
    },
    createUser(): Promise<ProfileDto> {
        return instance.post<ProfileDto>('/users').then((response) => response.data)
    },
    addRole(id: number): Promise<{ value: string }> {
        return instance.post<{ value: string }>(`/users${id}/role`).then((response) => response.data)
    },
    ban(id: number): Promise<ProfileDto> {
        return instance.patch<ProfileDto>(`/users${id}/ban`).then((response) => response.data)
    },
    unban(id: number): Promise<ProfileDto> {
        return instance.delete<ProfileDto>(`/users${id}/ban`).then((response) => response.data)
    }
}
