import request from "../utils/request"

// 获取key
export const LoginKeyAPI = async () => {
    // 时间戳
    let timeStamp = new Date().getTime()
    const { data:key } =  await request.get('/login/qr/key', {params: {timeStamp: timeStamp}})
    return key.data.unikey
}

// 获取二维码图片
export const LoginImgAPI = async (key) => {
    // 时间戳
    let timeStamp = new Date().getTime()
    const res =  await request.get('/login/qr/create', {params: {key: key, qrimg: true, timeStamp: timeStamp}})
    return res.data.data.qrimg
}

// 登陆验证
export const LoginCheckAPI = async (key, timestamp) => {
    return request.get('/login/qr/check', {params: {key: key, timestamp: timestamp}})
}

// 登陆状态
export const loginStatusAPI = async () => {
    const res = await request.get('/login/status', {params: {cookie: sessionStorage.getItem('cookie')}})
    return res
}