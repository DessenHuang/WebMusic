import request from "../utils/request"

// 热搜关键字接口
const hotSearchAPI = () => {
    return request.get('/search/hot')
}

// 搜索结果接口
const searchSuggestAPI = _keywords => {
    return request.get('/cloudsearch', {params: {keywords: _keywords, limit: 100}})
}

export {hotSearchAPI, searchSuggestAPI}