import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
});


instance.interceptors.request.use((config) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});
