import request from "../utils/request"

export const commentListAPI = (id, offset) => {
    return request.get('/comment/music', {params: {id: id, offset: offset}})
}


