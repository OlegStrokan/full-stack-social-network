import { instance } from "./instance.api";
import { RegistrationDto } from "../types/auth/registration.dto";
import { LoginDto } from "../types/auth/login.dto";
import { IRoleDto } from "../types/role/role.dto";

export interface ISuccessResponse {
	message: string;
	statusCode: number;
}

export interface ILoginResponse {
	username: string;
	id: number;
	roles: IRoleDto[];
	iat: number,
	exp: number,
	token: string;
}

export type IMeResponse = {
	data: Omit<ILoginResponse, "token">,
	statusCode: number;
}

export const authAPI = {
	registration(dto: RegistrationDto): Promise<ISuccessResponse> {
		return instance.post<ISuccessResponse>("/auth/registration", dto)
			.then((response) => response.data);
	},
	login(dto: LoginDto): Promise<ILoginResponse> {
		return instance.post<ILoginResponse>("/auth/login", dto)
			.then((response) => response.data);
	},
	me(): Promise<IMeResponse> {
		return instance.get<IMeResponse>("/auth/me")
			.then((response) => response.data);
	}
};
