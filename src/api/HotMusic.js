import request from "../utils/request"

// 最新歌曲
export const hotMusicAPI = () => {
    return request.get('/personalized/newsong',{params: {limit: 20}})
}