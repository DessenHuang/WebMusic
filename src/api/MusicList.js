import request from "../utils/request"

export const getMusicListAPI = () => {
    return request.get('/personalized', {params: {limit: 10}})
}