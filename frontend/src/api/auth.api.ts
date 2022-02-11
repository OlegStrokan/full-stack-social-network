import { instance } from './instance.api';
import { RegistrationDto } from "../types/auth/registration.dto";
import { LoginDto } from "../types/auth/login.dto";

export interface ISuccessResponse {
    message: string;
    statusCode: number
}

interface ILoginResponse {
    token: string;
}

export const authAPI = {
    registration(dto: RegistrationDto): Promise<ISuccessResponse> {
        return instance.post<ISuccessResponse>('/auth/registration', dto)
            .then((response) => response.data)
    },
    login(dto: LoginDto): Promise<ILoginResponse> {
        return instance.post<ILoginResponse>('/auth/login', dto)
        .then((response) => response.data)
    }
}
