import { instance } from './instance.api';

export interface ISuccessResponse {
    message: string;
    statusCode: number
}

interface ILoginResponse {
    token: string;
}

export const authAPI = {
    registration(email: string, username: string, fullname: string, password: string, avatar: string): Promise<ISuccessResponse> {
        return instance.post<ISuccessResponse>('/auth/registration', {email, username, fullname, password, avatar})
            .then((response) => response.data)
    },
    login(email: string, password: string): Promise<ILoginResponse> {
        return instance.post<ILoginResponse>('/auth/login', {email, password})
        .then((response) => response.data)
    }
}
