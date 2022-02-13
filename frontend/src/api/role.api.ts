import { instance } from "./instance.api";
import { CreateRoleDto } from "../types/role/createRole.dto";
import { RoleDto } from "../types/role/role.dto";

export const roleAPI = {
    getRole(value: string): Promise<RoleDto> {
        return instance.get<RoleDto>(`/roles${value}`).then((response) => response.data)
    },
    createRole(role: CreateRoleDto): Promise<RoleDto> {
        return instance.post<RoleDto>('/roles', role).then((response) => response.data)
    }
}
