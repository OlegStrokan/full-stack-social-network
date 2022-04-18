import { instance } from "./instance.api";
import { RegistrationDto } from "../types/auth/registration.dto";
import { LoginDto } from "../types/auth/login.dto";
import { IRoleDto } from "../types/role/role.dto";
import { VerifyCodeDto } from '../types/auth/verify-code.dto';
import { SetPasswordDto } from '../types/auth/set-password.dto';

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
	},
	sendEmail(email: string): Promise<void> {
		return instance.post<void>("/auth/send_verification_email", { email })
			.then((response) => response.data);
	},
	verifyCode(dto: VerifyCodeDto): Promise<void> {
		return instance.patch<void>("/auth/verify_code", dto)
			.then((response) => response.data);
	},
	setPassword(dto: SetPasswordDto): Promise<void> {
		return instance.patch<void>("/auth/set_password", dto)
			.then((response) => response.data);
	}
};
