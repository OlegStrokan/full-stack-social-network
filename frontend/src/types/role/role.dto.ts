import { CreateRoleDto } from "./createRole.dto";

export interface RoleDto extends CreateRoleDto {
    id: number;
}



export interface IRoleDto {
    id: number,
    value: string,
    description: string,
    UserRolesModel: {
        id: number,
        roleId: number,
        userId: number
    }
}
