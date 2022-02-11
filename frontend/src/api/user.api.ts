import { instance } from "./instance.api";


export const userApi = {
    getUsers() {
        return instance.get('/users').then((response) => response.data)
    },
    createUser() {
        return instance.post('/users').then((response) => response.data)
    },
    addRole(id: number) {
        return instance.post(`/users${id}/role`).then((response) => response.data)
    },
    ban(id: number) {
        return instance.patch(`/users${id}/ban`).then((response) => response.data)
    },
    unban(id: number) {
        return instance.delete(`/users${id}/ban`).then((response) => response.data)
    }
}
