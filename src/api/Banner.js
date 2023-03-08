import request from "../utils/request"

export const getBannerAPI = () => {
    return request.get('/banner', {params: {type: 2}})
}