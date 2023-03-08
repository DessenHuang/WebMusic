import request from "../utils/request"

// 获取歌单详情信息
const getItemMusicAPI = (id) => {
    return request.get('/playlist/detail', {params: {id: id}})
}

// 获取歌单歌曲列表
const getItemMusicListAPI = (id) => {
    return request.get('/playlist/track/all', {params: {id: id}})
}

export {
    getItemMusicAPI,
    getItemMusicListAPI
}