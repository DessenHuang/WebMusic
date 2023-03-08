import request from "../utils/request"

export const LogoutAPI = () => {
    request.get('/logout')
}