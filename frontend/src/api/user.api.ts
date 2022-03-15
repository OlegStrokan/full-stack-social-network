import { instance } from "./instance.api";
import { ProfileDto } from "../types/profile/profile.dto";
import { AddRoleDto } from "../types/user/addRole.dto";
import { CreateUserDto } from "../types/user/createUser.dto";
import { BanUserDto } from "../types/user/banUser.dto";


export const userAPI = {
    getUsers(): Promise<ProfileDto[]> {
        return instance.get<ProfileDto[]>('/users').then((response) => response.data)
    },
    createUser(dto: CreateUserDto): Promise<ProfileDto[]> {
        return instance.post<ProfileDto[]>('/users', dto).then((response) => response.data)
    },
    addRole(dto: AddRoleDto): Promise<ProfileDto[]> {
        return instance.post<ProfileDto[]>(`/users/${dto.userId}/role`, dto.value).then((response) => response.data)
    },
    banUser(dto: BanUserDto): Promise<ProfileDto[]> {
        return instance.patch<ProfileDto[]>(`/users/${dto.userId}/ban`, dto.banReason).then((response) => response.data)
    },
    unbanUser(id: number): Promise<ProfileDto[]> {
        return instance.delete<ProfileDto[]>(`/users${id}/ban`).then((response) => response.data)
    }
}
