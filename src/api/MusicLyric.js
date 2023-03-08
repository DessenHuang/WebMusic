import request from "../utils/request"

// 获取歌词
export const getMusicLyricAPI = (id) => {
    return request.get('/lyric', {params: {id: id}})
}
